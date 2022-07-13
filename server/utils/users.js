const users = {
  logedUsers: [],
  watingHosts: [],
  addUser(id, name) {
    this.logedUsers.push({ id, name, room: undefined });
  },
  addHost(id, room) {
    const user = this.removeLogedUser(id);
    if (user) {
      user.room = room;
      this.watingHosts.push(user);
    }
  },
  getAllHost() {
    if (!this.watingHosts[0]) return [{ noAvailableHosts: true }];
    return this.watingHosts;
  },
  removeLogedUser(id) {
    const index = this.logedUsers.findIndex((user) => user.id === id);
    if (-1 !== index) return this.logedUsers.slice(index, 1);
  },
  removeHost(id) {
    const index = this.watingHosts.findIndex((user) => user.id === id);
    if (-1 !== index) return this.watingHosts.slice(index, 1);
  },
  removeUser(id) {
    this.removeLogedUser(id);
    this.removeHost(id);
  },
};

module.exports = users;
