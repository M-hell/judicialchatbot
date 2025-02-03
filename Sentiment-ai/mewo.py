# Import necessary libraries
import re
import joblib
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
import nltk
nltk.download('stopwords')
# nltk.download('punkt')  # (Optional) If you use tokenization

# Initialize the stemmer
port_stem = PorterStemmer()

# Define the function for preprocessing (similar to what you used for stemming)
def stemming(content):
    stemmed_content = re.sub('[^a-zA-Z]',' ',content)  # Remove non-alphabetic characters
    stemmed_content = stemmed_content.lower()  # Convert to lowercase
    stemmed_content = stemmed_content.split()  # Split into words
    stemmed_content = [port_stem.stem(word) for word in stemmed_content if word not in stopwords.words('english')]  # Apply stemming and remove stopwords
    stemmed_content = ' '.join(stemmed_content)  # Join words back into a single string
    return stemmed_content

# Load the trained model and vectorizer from local files
model = joblib.load("trained_model.sav")  
vectorizer = joblib.load("vectorizer.pkl")  

# Input your own sentence for prediction
input_sentence = input("Enter the sentence: ")

# Preprocess the input sentence
processed_sentence = stemming(input_sentence)

# Vectorize the input using the same vectorizer as during training
vectorized_input = vectorizer.transform([processed_sentence])  # Note: It's a list of sentences, even if there's only one sentence

# Predict using the model
prediction = model.predict(vectorized_input)

# Output the prediction
if prediction[0] == 0:
    print("Negative Tweet")
else:
    print("Positive Tweet")
