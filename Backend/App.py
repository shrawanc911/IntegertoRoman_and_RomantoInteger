from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

ROMAN_MAP = {
    "I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000
}

def int_to_roman(num):
    if not (1 <= num):
        return "Invalid input", []

    val = [
        (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
        (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
        (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")
    ]
    roman = ""
    steps = []
    for arabic, symbol in val:
        while num >= arabic:
            roman += symbol
            steps.append(f"Subtract {arabic}, add '{symbol}' → {roman}")
            num -= arabic
    return roman, steps

def roman_to_int(roman):
    roman = roman.upper()
    total, prev_value = 0, 0
    steps = []

    for char in reversed(roman):
        value = ROMAN_MAP.get(char, 0)
        if value < prev_value:
            total -= value
            steps.append(f"Subtract {value} for '{char}', total = {total}")
        else:
            total += value
            steps.append(f"Add {value} for '{char}', total = {total}")
        prev_value = value

    if int_to_roman(total)[0] == roman:
        return total, steps
    return "Invalid input", []

@app.route('/convert', methods=['POST'])
def convert():
    data = request.json

    if "integer" in data:
        try:
            num = int(data["integer"])
            roman_result, steps = int_to_roman(num)
            return jsonify({"result": roman_result, "steps": steps})
        except ValueError:
            return jsonify({"error": "Invalid integer"}), 400

    if "roman" in data:
        result, steps = roman_to_int(data["roman"])
        return jsonify({"result": result, "steps": steps})

    return jsonify({"error": "Invalid request"}), 400

if __name__ == '__main__':
    app.run(debug=True)
