"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInfoPageProps = void 0;
const createInfoPageProps = ({ studentName, infoId, 
// should be provided by server
infoName, emoji, }) => {
    return {
        parent: {
            type: "database_id",
            database_id: infoId,
        },
        icon: {
            type: "emoji",
            emoji,
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: `${studentName}'s ${infoName}`,
                        },
                    },
                ],
            },
        },
    };
};
exports.createInfoPageProps = createInfoPageProps;
