import json

# Input and output file names
input_file = 'constitution_qa.jsonl'      # Your original file
output_file = 'vertex_format.jsonl'  # Converted file for Vertex AI

# Open files for reading and writing
with open(input_file, 'r', encoding='utf-8') as infile, \
     open(output_file, 'w', encoding='utf-8') as outfile:

    for line in infile:
        data = json.loads(line.strip())

        # Construct the Vertex AI format
        vertex_entry = {
            "contents": [
                {
                    "role": "user",
                    "parts": [
                        {"text": data["question"]}
                    ]
                },
                {
                    "role": "model",
                    "parts": [
                        {"text": data["answer"]}
                    ]
                }
            ]
        }

        # Write each JSONL entry
        outfile.write(json.dumps(vertex_entry) + '\n')

print("✅ Conversion complete! Output saved to", output_file)
