"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInfoPageProps = void 0;
const createInfoPageProps = ({ studentName, infoId, time, 
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
            Time: {
                date: {
                    start: time,
                    end: null,
                    time_zone: null,
                },
            },
        },
    };
};
exports.createInfoPageProps = createInfoPageProps;
