# turns contents of all markdown files into yaml files
import os
import glob
import yaml
import re

yaml_list = []
# ingest files from this directory
path = './'
markdown_files = glob.glob(path + '*.md')
for markdown_file in markdown_files:
    # read markdown file
    with open(markdown_file, 'r') as f:
        markdown_contents = f.read()
        # grab h1
        h1 = re.search('# (.*)', markdown_contents).group(1)
        everything_else = re.sub('# (.*)', '', markdown_contents)
        # convert to yaml
        yaml_contents ={h1: everything_else}
        print(yaml_contents)
        # add yaml_contents to yaml_list
        yaml_list.append(yaml_contents)

# print (yaml_list)
# turn yaml_list into a file called 'terms.yaml'
with open('glossary.yaml', 'w') as f:
    # yaml.dump(yaml_list, f, default_flow_style=False, default_style=None)
    yaml.safe_dump(yaml_list, f, indent=4, allow_unicode=False)
