import os
import pdfplumber
import pandas as pd
import re


def extract_answers_from_pdf(pdf_path):
    """Extracts MCQ answers from a given PDF file."""
    answers = []

    with pdfplumber.open(pdf_path) as pdf:
        full_text = "".join(page.extract_text() or "" for page in pdf.pages)
        matches = re.findall(r"(\d+)\s+([A-D])", full_text)
        answers = [{"question": int(q), "answer": a} for q, a in matches]

    return answers


def clean_data(df):
    """Removes duplicate rows and incorrect question numbers."""
    df = df[df["question"] != 5070]  # Remove incorrect question numbers
    df = df.drop_duplicates(
        subset=["year", "session", "variant", "question"], keep="first"
    )  # Remove duplicates
    return df


def parse_marking_schemes(folder_path, output_csv="mcq_answers.csv"):
    """Parses all marking scheme PDFs in the given folder structure and saves results to a CSV."""
    all_data = []

    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.endswith(".pdf"):
                file_path = os.path.join(root, file)

                # Extract metadata from filename
                match = re.match(r"5070_(s|w)(\d{2})_ms_(\d{2})", file)
                if match:
                    session_code, year_suffix, variant = match.groups()
                    year = f"20{year_suffix}"
                    session = "Summer" if session_code == "s" else "Winter"

                    print(f"Parsing: {file_path}")
                    answers = extract_answers_from_pdf(file_path)

                    for ans in answers:
                        ans.update(
                            {"year": year, "session": session, "variant": variant}
                        )
                    all_data.extend(answers)

    df = pd.DataFrame(all_data)
    df = clean_data(df)  # Clean data before saving

    if os.path.exists(output_csv):
        try:
            existing_df = pd.read_csv(output_csv)
            df = pd.concat([existing_df, df], ignore_index=True)
            df = clean_data(df)  # Ensure duplicates are removed after merging
        except pd.errors.EmptyDataError:
            print("Existing CSV is empty. Creating a new file.")

    df.to_csv(output_csv, index=False)
    print(f"Parsing complete! Data saved to {output_csv}")


# Run the parser on the folder containing marking schemes
parse_marking_schemes("MCQs")
