#!/bin/bash

# Convert all *.sh files to UNIX EOL (LF)
find . -type f -name "*.sh" | while read -r file; do
  echo "Converting $file to UNIX EOL..."
  dos2unix "$file" 2>/dev/null || sed -i 's/\r$//' "$file"
done

echo "Conversion complete."
