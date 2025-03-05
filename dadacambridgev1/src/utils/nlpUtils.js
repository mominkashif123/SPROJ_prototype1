import * as use from '@tensorflow-models/universal-sentence-encoder';
import * as tf from '@tensorflow/tfjs';

// ✅ Load NLP Model
let model = null;
export const loadNLPModel = async () => { // ✅ Explicitly export this function
    if (!model) {
        model = await use.load();
        console.log("✅ NLP Model Loaded!");
    }
    return model;
};

// ✅ Cosine Similarity Function
const cosineSimilarity = (vecA, vecB) => {
    const vecA_reshaped = tf.reshape(vecA, [1, -1]);  
    const vecB_reshaped = tf.reshape(vecB, [1, -1]);  

    const dotProduct = tf.tidy(() => tf.matMul(vecA_reshaped, vecB_reshaped.transpose()).dataSync()[0]);
    const normA = tf.tidy(() => tf.norm(vecA_reshaped).dataSync()[0]);
    const normB = tf.tidy(() => tf.norm(vecB_reshaped).dataSync()[0]);

    return dotProduct / (normA * normB);
};

// ✅ Function to Calculate Similarity Score
export const checkSimilarity = async (studentAnswer, correctAnswers) => {
    await loadNLPModel(); // ✅ Ensure model is loaded

    // Get embeddings
    const embeddings = await model.embed([studentAnswer, ...correctAnswers]);

    // Extract the student answer vector
    const studentVec = embeddings.slice([0, 0], [1, -1]);

    let bestMatch = 0;
    let bestSentence = "";

    // Compare against all correct answers
    for (let i = 0; i < correctAnswers.length; i++) {
        const correctVec = embeddings.slice([i + 1, 0], [1, -1]);
        const similarity = cosineSimilarity(studentVec, correctVec);
        
        if (similarity > bestMatch) {
            bestMatch = similarity;
            bestSentence = correctAnswers[i];
        }
    }

    return { similarity: bestMatch, matchedSentence: bestSentence };
};
