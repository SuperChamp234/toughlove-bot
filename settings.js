const REDIS_PREFIX = process.env.REDIS_PREFIX || "tl";

class Settings {
  constructor(redisClient) {
    this.redisClient = redisClient;
  }

  async setMessage(name, message) {
    await this.redisClient.set(`${REDIS_PREFIX}:message:${name}`, message);
  }

  async getMessage(name) {
    let msg =
      (await this.redisClient.get(`${REDIS_PREFIX}:message:${name}`)) ||
      "\u200b";
    return msg.replace(/\\n/g, "\n");
  }

  async setQuestions(questions,type="application") {
    await this.redisClient.set(
      `${REDIS_PREFIX}:questions:${type}`,
      JSON.stringify(questions)
    );
  }

  async getQuestions(type) {
    if(type=="sample") //because there isn't a sample questions setter.
      return [
        "Goal for the week:",
        "How it connects to your main goal(s): (Why is it vital for you to complete it?)",
        "How you plan to accomplish it: (Please be as specific as possible and add as many steps as needed)",
        "Time frame you're looking at for accomplishing this goal:",
        "How you will prove that you've done this goal:",
        "Reflection/thoughts you've had while setting this goal:",
      ];
    else 
      return JSON.parse(
        (await this.redisClient.get(`${REDIS_PREFIX}:questions:${type}`)) || "[]"
      );
  }

  async getSamplePostQuestions() {
    
  }

  async setChannelId(id) {
    await this.redisClient.set(`${REDIS_PREFIX}:channel_id`, id);
  }

  async getChannelId() {
    return await this.redisClient.get(`${REDIS_PREFIX}:channel_id`);
  }

  async setRoleId(id) {
    await this.redisClient.set(`${REDIS_PREFIX}:role_id`, id);
  }

  async getRoleId() {
    return await this.redisClient.get(`${REDIS_PREFIX}:role_id`);
  }

  async saveApplication(key, applicationData) {
    await this.redisClient.set(
      `${REDIS_PREFIX}:current_applications:${key}`,
      JSON.stringify(applicationData)
    );
  }

  async fetchApplication(key) {
    return JSON.parse(
      (await this.redisClient.get(
        `${REDIS_PREFIX}:current_applications:${key}`
      )) || "{}"
    );
  }

  async deleteApplication(key) {
    await this.redisClient.del(`${REDIS_PREFIX}:current_applications:${key}`);
  }

  async saveSubmission(key, applicationData) {
    this.redisClient.set(
      `${REDIS_PREFIX}:submitted_applications:${key}`,
      JSON.stringify(applicationData)
    );
  }

  async fetchSubmission(key) {
    return JSON.parse(
      (await this.redisClient.get(
        `${REDIS_PREFIX}:submitted_applications:${key}`
      )) || "{}"
    );
  }

  async addQuestion(question, index = null) {
    const questions = await this.getQuestions();
    if (index === null) {
      questions.push(question);
    } else if (index >= 1 && index <= questions.length) {
      questions.splice(index - 1, 0, question);
    }
    await this.setQuestions(questions);
  }

  async editQuestion(index, question) {
    const questions = await this.getQuestions();
    if (index >= 1 && index <= questions.length) {
      questions.splice(index - 1, 1, question);
    }
    await this.setQuestions(questions);
  }

  async removeQuestion(index) {
    const questions = await this.getQuestions();
    if (index >= 1 && index <= questions.length) {
      questions.splice(index - 1, 1);
    }
    await this.setQuestions(questions);
  }
}

module.exports = Settings;
module.exports.Settings = Settings;
module.exports.default = Settings;
