const Group = require("../models/GroupSchama")


module.exports.creategroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    const newGroup = new Group({ name, members, transactions: [], pendingAmounts: {} });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports.addexpanse = async (req, res) => {
  try {
    const { groupId, description, amount, paidBy, splitAmong } = req.body;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const perPersonAmount = amount / splitAmong.length;
    group.transactions.push({ description, amount, paidBy, splitAmong, perPersonAmount });
    
    splitAmong.forEach((member) => {
      if (member !== paidBy) {
        group.pendingAmounts.set(member, (group.pendingAmounts.get(member) || 0) + perPersonAmount);
      }
    });

    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports.getgroupDetails = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}