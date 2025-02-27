import pandas as pd
import json

def convert_tsv_to_json(tsv_file_path, json_file_path):
    # load file
    df = pd.read_csv(tsv_file_path, sep='\t')
    
    # drop the first row if it contains search parameters
    if 'Search Parameters' in df.columns:
        df = df.iloc[1:].reset_index(drop=True)
    
    # convert to json
    json_output = df.to_json(orient="records", indent=4)
    
    # save
    with open(json_file_path, "w") as json_file:
        json_file.write(json_output)
    
    print(f"JSON file saved to: {json_file_path}")


tsv_file = "volcano_data.tsv"
json_file = "volcano_data.json"
convert_tsv_to_json(tsv_file, json_file)
