from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/analyze', methods=['POST'])
def analyze_dna():
    data = request.json
    raw_dna = data.get('dna', '')

    a = raw_dna.replace(" ", "").replace("\n", "").replace("\r", "").upper()

    report = {
        "cleaned_dna": a,
        "length": len(a),
        "starts_with_atg": a.startswith("ATG"),
        "ends_with_taa": a.endswith("TAA"),
        "is_alpha": a.isalpha(),
        "signature": a[3:9] if len(a) >= 9 else "Too Short"
    }
    
    return jsonify(report)

if __name__ == '__main__':
    app.run(debug=True, port=5000)