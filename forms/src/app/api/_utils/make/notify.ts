// discord notification via make webhook
// too lazy rn to configure discord sdk

export const notifyTeam = async (message: string) => {
  const WEBHOOK_URL =
    "https://hook.us1.make.com/hpghycjku88wfgcyycxlsccxlhaykogj";
  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `@here ${message}`,
      }),
    });
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
