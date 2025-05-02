import json
import os
import sys

def convert_json_to_jsonl(input_file):
    # Check file existence
    if not os.path.exists(input_file):
        print(f"❌ File not found: {input_file}")
        return

    # Check file extension
    if not input_file.endswith(".json"):
        print("❌ Please provide a .json file")
        return

    # Define output file
    output_file = input_file.replace(".json", ".jsonl")

    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

        if isinstance(data, list):
            with open(output_file, 'w', encoding='utf-8') as f:
                for item in data:
                    f.write(json.dumps(item) + '\n')
            print(f"✅ Converted to {output_file}")
        else:
            print("❌ The JSON file does not contain a list of objects.")
            print("   Only arrays of JSON objects are supported.")
    except Exception as e:
        print(f"❌ Error during conversion: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("🔧 Usage: python json_to_jsonl.py <filename.json>")
    else:
        convert_json_to_jsonl(sys.argv[1])
