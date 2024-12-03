from flask import Flask, request, jsonify
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

app = Flask(__name__)

# Load the SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Define the skill extraction function
def extract_skills(generated_skills, db_skills):
    db_embeddings = model.encode(db_skills)
    gen_embeddings = model.encode(generated_skills)
    extracted_skills = []
    print(db_embeddings)
    print(gen_embeddings)
    for skill, embed in zip(generated_skills, gen_embeddings):
        similarity = cosine_similarity([embed], db_embeddings)
        extracted_skill = db_skills[similarity.argmax()]
        print(extracted_skill)
        extracted_skills.append(extracted_skill)
    return extracted_skills

# Define a route to handle skill extraction requests
@app.route('/extract_skills', methods=['POST'])
def extract_skills_endpoint():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        generated_skills = data['generated_skills']
        db_skills = data['db_skills']
        print(generated_skills)
        print(db_skills)
        # Call the extract_skills function
        extracted_skills = extract_skills(generated_skills, db_skills)
        
        # Return the result as JSON
        return jsonify({'extracted_skills': extracted_skills})
    
    except Exception as e:
        print
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
