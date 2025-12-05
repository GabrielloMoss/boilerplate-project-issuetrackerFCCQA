'use strict';

const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  project: { type: String, required: true },
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: { type: String, default: '' },
  status_text: { type: String, default: '' },
  open: { type: Boolean, default: true },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now }
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(async function (req, res){
      let project = req.params.project;
      let filter = { project: project };
      
      if (req.query._id) filter._id = req.query._id;
      if (req.query.issue_title) filter.issue_title = req.query.issue_title;
      if (req.query.issue_text) filter.issue_text = req.query.issue_text;
      if (req.query.created_by) filter.created_by = req.query.created_by;
      if (req.query.assigned_to) filter.assigned_to = req.query.assigned_to;
      if (req.query.status_text) filter.status_text = req.query.status_text;
      if (req.query.open !== undefined) filter.open = req.query.open;
      
      try {
        const issues = await Issue.find(filter).select('-project -__v');
        res.json(issues);
      } catch (err) {
        res.json({ error: 'could not get issues' });
      }
    })
    
    .post(async function (req, res){
      let project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
      
      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: 'required field(s) missing' });
      }
      
      try {
        const newIssue = new Issue({
          project: project,
          issue_title: issue_title,
          issue_text: issue_text,
          created_by: created_by,
          assigned_to: assigned_to || '',
          status_text: status_text || '',
          open: true,
          created_on: new Date(),
          updated_on: new Date()
        });
        
        const savedIssue = await newIssue.save();
        res.json({
          _id: savedIssue._id,
          issue_title: savedIssue.issue_title,
          issue_text: savedIssue.issue_text,
          created_by: savedIssue.created_by,
          assigned_to: savedIssue.assigned_to,
          status_text: savedIssue.status_text,
          open: savedIssue.open,
          created_on: savedIssue.created_on,
          updated_on: savedIssue.updated_on
        });
      } catch (err) {
        res.json({ error: 'could not create issue' });
      }
    })
    
    .put(async function (req, res){
      let project = req.params.project;
      const { _id, issue_title, issue_text, created_by, assigned_to, status_text, open } = req.body;
      
      if (!_id) {
        return res.json({ error: 'missing _id' });
      }
      
      if (!issue_title && !issue_text && !created_by && !assigned_to && !status_text && open === undefined) {
        return res.json({ error: 'no update field(s) sent', '_id': _id });
      }
      
      try {
        const updateFields = { updated_on: new Date() };
        if (issue_title) updateFields.issue_title = issue_title;
        if (issue_text) updateFields.issue_text = issue_text;
        if (created_by) updateFields.created_by = created_by;
        if (assigned_to) updateFields.assigned_to = assigned_to;
        if (status_text) updateFields.status_text = status_text;
        if (open !== undefined) updateFields.open = open;
        
        const updatedIssue = await Issue.findByIdAndUpdate(_id, updateFields, { new: true });
        
        if (!updatedIssue) {
          return res.json({ error: 'could not update', '_id': _id });
        }
        
        res.json({ result: 'successfully updated', '_id': _id });
      } catch (err) {
        res.json({ error: 'could not update', '_id': _id });
      }
    })
    
    .delete(async function (req, res){
      let project = req.params.project;
      const { _id } = req.body;
      
      if (!_id) {
        return res.json({ error: 'missing _id' });
      }
      
      try {
        const deletedIssue = await Issue.findByIdAndDelete(_id);
        
        if (!deletedIssue) {
          return res.json({ error: 'could not delete', '_id': _id });
        }
        
        res.json({ result: 'successfully deleted', '_id': _id });
      } catch (err) {
        res.json({ error: 'could not delete', '_id': _id });
      }
    });
    
};
