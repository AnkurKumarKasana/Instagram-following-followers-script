# 📊 Instagram Follower Analyzer (Unofficial)

> Identify who **isn’t following you back** and who **you don’t follow back** – directly from your browser using Instagram’s internal web API.  
> ⚠️ For **educational use only**. Use responsibly.

---

## 🚀 Features

- 🔍 **Get your full list of followers and following**
- ✅ See users who follow you but you don't follow back
- ❌ Detect users you follow but who don’t follow you back
- 🧠 Clean async/await logic using internal APIs
- 🔐 No password or API key required – uses your logged-in session

---

## 📥 How to Use (Step-by-Step)

> Follow these steps to run the script in your browser:

### ✅ Step 1: Login to Instagram
- Open [instagram.com](https://www.instagram.com) in **Google Chrome** or another desktop browser.
- Make sure you're logged into the account you want to analyze.

---

### 🧪 Step 2: Open Developer Tools Console
- Press `F12` or `Ctrl + Shift + I` (on Windows/Linux)  
- Or `Cmd + Option + I` (on Mac)
- Go to the **Console tab**

---

### 📋 Step 3: Paste the Script
- Copy the full script from the [`script.js`](./script.js) file in this repo
- Paste it into the Console

---

### ✏️ Step 4: Set Your Username
Before running the script, replace:
```js
const username = "example_username";
```

-With your actual Instagram username, like:
```
const username = "your_username";
```
---
### 🚀 Step 5: Run the Script
-Press Enter to run the script
-Wait while it fetches and compares your followers and following lists
---
### 🧾 Step 6: Read Your Results
```js

{
  PeopleIDontFollowBack: ["alice", "john_doe"],
  PeopleNotFollowingMeBack: ["elonmusk", "ceo_life"]
}
```
---
### 📷 Output Example
```------------------------------
Fetched 1450 followers and 1130 following.
If this doesn't seem right, some of the output might be incomplete.

{
  PeopleIDontFollowBack: [ 'devgirl', 'uiux_master' ],
  PeopleNotFollowingMeBack: [ 'elontechtips', 'marketing_genius' ]
}
