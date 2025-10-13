import fetch from "node-fetch";

const CLIENT_ID = "8jj6avab0qjp3lz";
const CLIENT_SECRET = "spt5xyxwo3bisev";
const CODE = "LrNo6FCckgsAAAAAAAAAAc0x_cb57aWZtio7IiKcOy0sa_nbSXCYEE0mDCcmeKrO";

const getRefreshToken = async () => {
  const res = await fetch("https://api.dropboxapi.com/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      code: CODE,
      grant_type: "authorization_code",
      redirect_uri: "https://localhost", // same as in step 1 URL
    }),
  });

  const data = await res.json();
  console.log(data);
};

getRefreshToken();
