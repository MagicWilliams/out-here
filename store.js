import { action, observable, computed } from 'mobx';

const client = require('contentful').createClient({
  space: process.env.OUT_HERE_CONTENTFUL_SPACE_ID,
  accessToken: process.env.OUT_HERE_CONTENTFUL_ACCESS_TOKEN
});

class Store {
	@observable allEntries;

  @action.bound
  async getEntries() {
    await client.getEntries({
      content_type: 'entry',
    }).then((res) => {
      allEntries = res.items;
    });
  }
}

export default Store;
