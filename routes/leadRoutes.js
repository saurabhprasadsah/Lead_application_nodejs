const express = require('express');
const router = express.Router();
const Lead = require('../models/lead');

// Create Lead
router.post('/create', async (req, res) => {
  const { emailId, name, number, product } = req.body;
  const newLead = new Lead({ emailId, name, number, product });
  await newLead.save();
  res.redirect('/leads');
});

// Read Leads (with search and sort)
router.get('/', async (req, res) => {
  const { search, sort } = req.query;
  let leads = await Lead.find();

  if (search) {
    leads = leads.filter(lead =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.emailId.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort) {
    leads = leads.sort((a, b) => a[sort].localeCompare(b[sort]));
  }

  res.render('index', { leads });
});

// Update Lead
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { emailId, name, number, product } = req.body;
  await Lead.findByIdAndUpdate(id, { emailId, name, number, product });
  res.redirect('/leads');
});

// Delete Lead
router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Lead.findByIdAndDelete(id);
  res.redirect('/leads');
});

module.exports = router;
