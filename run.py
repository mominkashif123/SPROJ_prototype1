import argparse
import pandas as pd
import joblib
import os

def load_artifact(path, name):
    if not os.path.exists(path):
        raise FileNotFoundError(f"{name} file not found at: {path}")
    return joblib.load(path)

def main():
    parser = argparse.ArgumentParser(description="Run saved ML model on new dataset")
    parser.add_argument('--model', type=str, required=True, help="Path to saved model file (e.g., rf_model.pkl)")
    parser.add_argument('--transformer', type=str, required=True, help="Path to saved ColumnTransformer")
    parser.add_argument('--encoder', type=str, required=True, help="Path to saved LabelEncoder")
    parser.add_argument('--data', type=str, required=True, help="Path to input CSV file for prediction")
    parser.add_argument('--output', type=str, default="predicted_topics.csv", help="File to save predictions")

    args = parser.parse_args()

    print("[INFO] Loading model and preprocessing objects...")
    model = load_artifact(args.model, "Model")
    transformer = load_artifact(args.transformer, "ColumnTransformer")
    encoder = load_artifact(args.encoder, "LabelEncoder")

    print(f"[INFO] Reading input data from {args.data}...")
    new_data = pd.DataFrame({
    'Year': [2025],
    'Paper_Session': ['MJ'],
    'Paper_Varient': ['12']
})

    required_columns = ['Year', 'Paper_Session', 'Paper_Varient']
    for col in required_columns:
        if col not in new_data.columns:
            raise ValueError(f"Missing required column in input: {col}")

    print("[INFO] Transforming data...")
    X_new = transformer.transform(new_data[required_columns])

    print("[INFO] Making predictions...")
    y_pred_encoded = model.predict(X_new)
    y_pred = encoder.inverse_transform(y_pred_encoded)

    print("[INFO] Saving predictions...")
    new_data['Predicted_Topic'] = y_pred
    print(new_data)
    new_data.to_csv(args.output, index=False)

    print(f"[DONE] Predictions saved to {args.output}")

if __name__ == "__main__":
    main()
