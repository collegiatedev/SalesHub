import { notion } from "../utils/notion";

interface GenerateBuildingaResumeInPageProps {
  parentId: string;
}
export const generateBuildingaResumeInPage = async ({
  parentId,
}: GenerateBuildingaResumeInPageProps) => {
  const keyMap = new Map<string, Array<any>>();
  const page = await notion.pages.create({
    parent: {
      type: "page_id",
      page_id: parentId,
    },
    icon: {
      type: "emoji",
      emoji: "📁",
    },
    properties: {
      title: [
        {
          text: {
            content: "Building a Resume",
          },
        },
      ],
    },
  });
  let res = await notion.blocks.children.append({
    block_id: page.id,
    children: [
      {
        callout: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "A resume serves as a professional summary of your educational background, professional experiences, and skills, tailored specifically for the internship or job role you're targeting. The main goal of your resume is to secure an interview. It's important to remember that resumes aren't one-size-fits-all; while this notion offers tips and guidelines, your resume should effectively represent your unique personal brand and tailored to your industry. ",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          icon: {
            type: "emoji",
            emoji: "📌",
          },
          color: "gray_background",
        },
      },
      {
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "Read through all sections before starting to reduce having to go back and forth to fix issues addressed later on in the Notion",
                link: null,
              },
              annotations: {
                bold: false,
                italic: true,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        heading_2: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Get Started",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          is_toggleable: true,
          color: "default",
        },
      },
      {
        heading_2: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Mastering Resume Writing",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          is_toggleable: true,
          color: "default",
        },
      },
      {
        heading_2: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "The Truth About Fancy Resume Templates",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          is_toggleable: true,
          color: "default",
        },
      },
      {
        heading_2: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Don’t Forget These",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          is_toggleable: true,
          color: "default",
        },
      },
      {
        heading_2: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Helpful Resources",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          is_toggleable: true,
          color: "default",
        },
      },
      {
        paragraph: {
          rich_text: [],
          color: "default",
        },
      },
    ],
  });
  keyMap.set("e1d2767699ca425a861e116e4a66846a", res.results);

  res = await notion.blocks.children.append({
    block_id: keyMap.get("e1d2767699ca425a861e116e4a66846a")![3].id,
    children: [
      {
        image: {
          caption: [],
          type: "file",
          file: {
            url: "https://prod-files-secure.s3.us-west-2.amazonaws.com/c9097400-be0f-4968-8fa7-55c5641669cc/e730c83b-f1ef-46ae-ab18-789e291762fc/iScreen_Shoter_-_Microsoft_Word_-_230723124150.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240615%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240615T024301Z&X-Amz-Expires=3600&X-Amz-Signature=3ee5eec70801038cb45dd098713cbaff31bebc18e99eb1c41a70172a9c26cfd8&X-Amz-SignedHeaders=host&x-id=GetObject",
            expiry_time: "2024-06-15T03:43:01.262Z",
          },
        },
      },
      {
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "Find a list of action verbs and other useful resources here: ",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
            {
              type: "text",
              text: {
                content: " ",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
    ],
  });
  keyMap.set("5d386192-5622-4679-b859-fc762508430d", res.results);

  res = await notion.blocks.children.append({
    block_id: keyMap.get("e1d2767699ca425a861e116e4a66846a")![6].id,
    children: [
      {
        file: {
          caption: [],
          type: "file",
          file: {
            url: "https://prod-files-secure.s3.us-west-2.amazonaws.com/c9097400-be0f-4968-8fa7-55c5641669cc/a64da100-947c-446a-b658-1ccb7ef92cda/Resume_Resume_Template.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240615%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240615T024302Z&X-Amz-Expires=3600&X-Amz-Signature=019698b5c05b5240f37f3f10298bd86d6de475ce49dab23eee3739d9ad8f41d4&X-Amz-SignedHeaders=host&x-id=GetObject",
            expiry_time: "2024-06-15T03:43:02.529Z",
          },
          name: "UTAustinReusumeExample.pdf",
        },
      },
      {
        file: {
          caption: [],
          type: "file",
          file: {
            url: "https://prod-files-secure.s3.us-west-2.amazonaws.com/c9097400-be0f-4968-8fa7-55c5641669cc/68042fcb-1f7b-4958-a645-ee146db54723/harvard.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240615%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240615T024302Z&X-Amz-Expires=3600&X-Amz-Signature=66d8b543c94788ce5ad549e1f79341dc8e8836e934a2424d687d9f2d3c948db2&X-Amz-SignedHeaders=host&x-id=GetObject",
            expiry_time: "2024-06-15T03:43:02.529Z",
          },
          name: "HarvardResumeNCoverLetter.pdf",
        },
      },
      {
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Opportunities + Internships Presentation Resource",
                link: null,
              },
              annotations: {
                bold: true,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bookmark: {
          caption: [],
          url: "https://www.canva.com/design/DAFpemq_584/3rA_KNSdQ1AhFX1l-kQc2A/view?utm_content=DAFpemq_584&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink",
        },
      },
    ],
  });
  keyMap.set("832768d4-79a6-47a2-bac5-24aa515437f0", res.results);

  res = await notion.blocks.children.append({
    block_id: keyMap.get("e1d2767699ca425a861e116e4a66846a")![4].id,
    children: [
      {
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "Fancy resume templates are generally looked down upon. The one exception would be if you are doing a more creative role where it aligns with your personal brand. ",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Creative Resumes",
                link: null,
              },
              annotations: {
                bold: true,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Example of a creative resume:",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        image: {
          caption: [],
          type: "file",
          file: {
            url: "https://prod-files-secure.s3.us-west-2.amazonaws.com/c9097400-be0f-4968-8fa7-55c5641669cc/63bafc34-cd3c-456a-bb43-1858cfbf7adb/creativeresume.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240615%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240615T024301Z&X-Amz-Expires=3600&X-Amz-Signature=bde150569f36dfbbf6c207c8bd841299f6b543eb5e648ffb849adc6e7ed397a0&X-Amz-SignedHeaders=host&x-id=GetObject",
            expiry_time: "2024-06-15T03:43:01.470Z",
          },
        },
      },
      {
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "The example above aligns with Emily’s personal brand as she is a designer and is using a creatively designed resume to apply to Spotify",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        paragraph: {
          rich_text: [],
          color: "default",
        },
      },
      {
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "ATS (Applicant Tracking Software)",
                link: null,
              },
              annotations: {
                bold: true,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "The reason fancy designs are going to hurt your case is because your resume will not be able to pass the ATS.",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Learn about the ATS here:",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bookmark: {
          caption: [],
          url: "https://medium.com/the-career-library/ats-friendly-resume-what-is-it-and-how-to-make-one-7fc7f714ebe4",
        },
      },
      {
        paragraph: {
          rich_text: [],
          color: "default",
        },
      },
    ],
  });
  keyMap.set("882c184e-f7db-48c9-8335-e212b54b9138", res.results);

  res = await notion.blocks.children.append({
    block_id: keyMap.get("e1d2767699ca425a861e116e4a66846a")![5].id,
    children: [
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "Be clear and concise (1 page generally max, 2 pages potentially okay based on industry)",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Formatting",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Spelling and grammar check your resume",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Submit as PDF unless asked otherwise",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
    ],
  });
  keyMap.set("d129135f-7cd1-41bd-a394-c58e74563b24", res.results);

  res = await notion.blocks.children.append({
    block_id: keyMap.get("e1d2767699ca425a861e116e4a66846a")![2].id,
    children: [
      {
        file: {
          caption: [],
          type: "file",
          file: {
            url: "https://prod-files-secure.s3.us-west-2.amazonaws.com/c9097400-be0f-4968-8fa7-55c5641669cc/69b81d2a-b299-40b5-8743-fdae032e750b/ResumeTemplate.docx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240615%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240615T024256Z&X-Amz-Expires=3600&X-Amz-Signature=9e0bb68dafe982e76499bf426e05062505bc864af99444f747f5f23449ffba7b&X-Amz-SignedHeaders=host&x-id=GetObject",
            expiry_time: "2024-06-15T03:42:56.685Z",
          },
          name: "ResumeTemplate.docx",
        },
      },
      {
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "If you do not have word check if your high school offers educational word access. If not you can use the free 30 day free trial. ",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        heading_3: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "1. Contact Information",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          is_toggleable: true,
          color: "default",
        },
      },
      {
        heading_3: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "2. Education",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          is_toggleable: true,
          color: "default",
        },
      },
      {
        heading_3: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "3. Experience",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          is_toggleable: true,
          color: "default",
        },
      },
      {
        heading_3: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "4. Leadership + Activities",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          is_toggleable: true,
          color: "default",
        },
      },
      {
        heading_3: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "5. Projects",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          is_toggleable: true,
          color: "default",
        },
      },
    ],
  });
  keyMap.set("df279038-2ebf-4ea7-956d-f5621c44ad8c", res.results);

  res = await notion.blocks.children.append({
    block_id: keyMap.get("d129135f-7cd1-41bd-a394-c58e74563b24")![1].id,
    children: [
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Keep it black and white ",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Use consistent font sizing with headers, text",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Consistent spacing",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "2 Fonts Max (1 for body, 1 for headers)",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
    ],
  });
  keyMap.set("c4b79282-644b-43c4-a942-f719f11a97c8", res.results);

  res = await notion.blocks.children.append({
    block_id: keyMap.get("df279038-2ebf-4ea7-956d-f5621c44ad8c")![5].id,
    children: [
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "List leadership positions held",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "List involvement in activities, organizations, volunteer experience ",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
    ],
  });
  keyMap.set("51d776d2-3a6f-41fa-bfad-6444a524ef9e", res.results);

  res = await notion.blocks.children.append({
    block_id: keyMap.get("df279038-2ebf-4ea7-956d-f5621c44ad8c")![2].id,
    children: [
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Name in larger font (easy to read, bold)",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "City, State",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Phone Number",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "Email Address (make sure it is professional: ex: ✅ rjackson@gmail.com ❌ jackbatman578@gmail.com)",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
    ],
  });
  keyMap.set("65dae6ce-ef3e-4b76-ad1d-60ec148ed58e", res.results);

  res = await notion.blocks.children.append({
    block_id: keyMap.get("df279038-2ebf-4ea7-956d-f5621c44ad8c")![6].id,
    children: [
      {
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "Not everyone has projects, but if you do it can be a unique supplement toy our application. ",
                link: null,
              },
              annotations: {
                bold: false,
                italic: true,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
            {
              type: "text",
              text: {
                content: "Signature Projects",
                link: null,
              },
              annotations: {
                bold: true,
                italic: true,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
            {
              type: "text",
              text: {
                content:
                  " are perfect to highlight on this portion of the resume",
                link: null,
              },
              annotations: {
                bold: false,
                italic: true,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "List projects",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "Describe Skills (ex: research, lab skills, programming languages, tools)",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
    ],
  });
  keyMap.set("c57315f9-dfe3-4bfb-8981-24c1ca833874", res.results);

  res = await notion.blocks.children.append({
    block_id: keyMap.get("df279038-2ebf-4ea7-956d-f5621c44ad8c")![4].id,
    children: [
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "List all paid an unpaid experiences ",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
    ],
  });
  keyMap.set("d070d637-f4b4-4d30-b387-43362cd76c8b", res.results);

  res = await notion.blocks.children.append({
    block_id: keyMap.get("df279038-2ebf-4ea7-956d-f5621c44ad8c")![3].id,
    children: [
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "School Name",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Major or Concentration",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Expected Graduation Date",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "GPA if above 3.0",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Higher Level Course Work",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
    ],
  });
  keyMap.set("d3b65416-1478-4d95-a4c2-2712934f7c35", res.results);

  res = await notion.blocks.children.append({
    block_id: keyMap.get("d070d637-f4b4-4d30-b387-43362cd76c8b")![0].id,
    children: [
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Job Titile",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Company",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Location",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Employment Date (ex: Jan 2022 → December 2022)",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
    ],
  });
  keyMap.set("bd8d9f91-a9b5-491b-8295-bacb438b054c", res.results);
};
