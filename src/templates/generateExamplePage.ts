import { notion } from "../utils/notion";

      interface GenerateExamplePageProps {
        parentId: string;
      }
      export const generateExamplePage = async ({ parentId }: GenerateExamplePageProps) => {
        let res = await notion.pages.create({
          "parent": {
  "type": "page_id",
  "page_id": parentId
},
          "icon": null,
          "properties": {
  "title": [
    {
      "text": {
        "content": "Example"
      }
    }
  ]
},
        });
        await notion.blocks.children.append({
          "block_id": res.id,
          "children": [
  {
    "paragraph": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "this sucks",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          }
        }
      ],
      "color": "default"
    }
  },
  {
    "divider": {}
  },
  {
    "heading_3": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "it is",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          }
        }
      ],
      "is_toggleable": false,
      "color": "default"
    }
  },
  {
    "heading_2": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "because",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          }
        }
      ],
      "is_toggleable": true,
      "color": "default"
    }
  },
  {
    "paragraph": {
      "rich_text": [],
      "color": "default"
    }
  }
]
        });
        
          res = await notion.blocks.children.append({
            "block_id": res.results[0].id,
            "children": [
  {
    "paragraph": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "i say so",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          }
        }
      ],
      "color": "default"
    }
  },
  {
    "callout": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "not true",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          }
        }
      ],
      "icon": {
        "type": "emoji",
        "emoji": "🚨"
      },
      "color": "gray_background"
    }
  },
  {
    "paragraph": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "here are a couple reasons",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          }
        }
      ],
      "color": "default"
    }
  },
  {
    "numbered_list_item": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "okay",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          }
        }
      ],
      "color": "default"
    }
  },
  {
    "numbered_list_item": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "also okay",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          }
        }
      ],
      "color": "default"
    }
  },
  {
    "numbered_list_item": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "yapping",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          }
        }
      ],
      "color": "default"
    }
  }
]
          });
          
          res = await notion.blocks.children.append({
            "block_id": res.results[0].id,
            "children": [
  {
    "numbered_list_item": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "bruh",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          }
        }
      ],
      "color": "default"
    }
  },
  {
    "numbered_list_item": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "lol",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          }
        }
      ],
      "color": "default"
    }
  },
  {
    "numbered_list_item": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "me",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          }
        }
      ],
      "color": "default"
    }
  },
  {
    "numbered_list_item": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "haha",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          }
        }
      ],
      "color": "default"
    }
  }
]
          });
          
          res = await notion.blocks.children.append({
            "block_id": res.results[0].id,
            "children": [
  {
    "bulleted_list_item": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "see?",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          }
        }
      ],
      "color": "default"
    }
  }
]
          });
          
      }