# Resources Directory

This directory contains resources for the QuantA&M website, including PowerPoints from meetings and member-submitted work.

## Naming Convention

Please follow the naming convention below for adding new PDF files to this directory:

resource-title-date.pdf

- **resource-title**: A short, descriptive title of the resource.
- **date**: The date the resource was created or added, in the format `YYYY-MM-DD`.

### Examples

- `quantum-computing-intro-2023-01-01.pdf`
- `advanced-quantum-algorithms-2023-02-15.pdf`

## Adding Resources to `resources.json`

To add a new resource to the `resources.json` file, follow these steps:

1. **Open the `resources.json` file** located in the `public` directory.

2. **Add a new entry** under the appropriate category (`PowerPoints from Meetings` or `Member-Submitted Work`).

### For PDF Files

Add an entry with the following structure:

```json
{
  "title": "Resource Title",
  "date": "YYYY-MM-DD",
  "type": "pdf",
  "file": "resource-title-date.pdf"
}


### For Hyperlinks

{
  "title": "Resource Title",
  "date": "YYYY-MM-DD",
  "type": "link",
  "url": "https://example.com/resource-link"
}


### Examples

{
  "title": "Quantum Computing Introduction",
  "date": "2023-01-01",
  "type": "pdf",
  "file": "quantum-computing-intro-2023-01-01.pdf"
}

{
  "title": "Quantum Cryptography",
  "date": "2023-04-05",
  "type": "link",
  "url": "https://example.com/quantum-cryptography"
}

Finally, save the json file and place the pdf (if applicable) into the resources directory. Thank you for contributing! If this process is too complicated, or you would like assistance, please raise a GitHub issue or contact an officer. 