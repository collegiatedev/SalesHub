interface NotionConductC1MeetingProps {
  parentId: string;
}
export const notionConductC1Meeting = ({ parentId }: NotionConductC1MeetingProps) => ({
  "parent": {
    "type": "database_id",
    "database_id": parentId,
  },
  "icon": {
  "type": "emoji",
  "emoji": "🤝"
},
  "properties": {
  "Name": {
    "title": [
      {
        "text": {
          "content": "Conduct C1 Meeting"
        }
      }
    ]
  }
},
  "children": [
  {
    "heading_1": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Introduction",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "Introduction",
          "href": null
        }
      ],
      "is_toggleable": true,
      "color": "default"
    }
  },
  {
    "heading_1": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Informal Q&A",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "Informal Q&A",
          "href": null
        }
      ],
      "is_toggleable": true,
      "color": "default"
    }
  },
  {
    "heading_1": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Presentation",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "Presentation",
          "href": null
        }
      ],
      "is_toggleable": true,
      "color": "default"
    }
  },
  {
    "heading_1": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Resources",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "Resources",
          "href": null
        }
      ],
      "is_toggleable": false,
      "color": "default"
    }
  },
  {
    "embed": {
      "caption": [
        {
          "type": "text",
          "text": {
            "content": "*Complete this form during the call",
            "link": null
          },
          "annotations": {
            "bold": true,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "*Complete this form during the call",
          "href": null
        }
      ],
      "url": "https://tally.so/r/npAVYb?id=2yozag01r1&name=John"
    }
  },
  {
    "paragraph": {
      "rich_text": [],
      "color": "default"
    }
  },
  {
    "paragraph": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Take notes of these responses: it will help you tailor the presentation to the family and provide the next salesperson with the necessary information to handle the call. ",
            "link": null
          },
          "annotations": {
            "bold": true,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "Take notes of these responses: it will help you tailor the presentation to the family and provide the next salesperson with the necessary information to handle the call. ",
          "href": null
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
            "content": "Presentation ",
            "link": null
          },
          "annotations": {
            "bold": true,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "Presentation ",
          "href": null
        }
      ],
      "is_toggleable": false,
      "color": "default"
    }
  },
  {
    "to_do": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Ask for specific questions or concerns they might have",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "Ask for specific questions or concerns they might have",
          "href": null
        }
      ],
      "checked": false,
      "color": "default"
    }
  },
  {
    "divider": {}
  },
  {
    "heading_1": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Post-Presentation Logistics",
            "link": null
          },
          "annotations": {
            "bold": true,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "Post-Presentation Logistics",
          "href": null
        }
      ],
      "is_toggleable": false,
      "color": "default"
    }
  },
  {
    "callout": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Two main components:\n1. Create Student/Parent GC & send Tally Forms\n2. Schedule C2/C3 – Try your best to get these calls scheduled on the C1 meeting itself",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "Two main components:\n1. Create Student/Parent GC & send Tally Forms\n2. Schedule C2/C3 – Try your best to get these calls scheduled on the C1 meeting itself",
          "href": null
        }
      ],
      "icon": {
        "type": "emoji",
        "emoji": "💡"
      },
      "color": "gray_background"
    }
  },
  {
    "heading_3": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Create Student/Parent GC",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "Create Student/Parent GC",
          "href": null
        }
      ],
      "is_toggleable": false,
      "color": "default"
    }
  },
  {
    "to_do": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Ask for parent & student phone number and email",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "Ask for parent & student phone number and email",
          "href": null
        }
      ],
      "checked": false,
      "color": "default"
    }
  },
  {
    "to_do": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Then, send them the student work call form and parent insight form in the Zoom chat (make sure it’s the form that has their ID) ",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "Then, send them the student work call form and parent insight form in the Zoom chat (make sure it’s the form that has their ID) ",
          "href": null
        }
      ],
      "checked": false,
      "color": "default"
    }
  },
  {
    "to_do": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Make a student/parent gc after collecting their phone numbers:",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "Make a student/parent gc after collecting their phone numbers:",
          "href": null
        }
      ],
      "checked": false,
      "color": "default"
    }
  },
  {
    "divider": {}
  },
  {
    "paragraph": {
      "rich_text": [],
      "color": "default"
    }
  }
]
});