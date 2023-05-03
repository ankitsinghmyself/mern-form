const Form = require('../models/formSchema');

const formController = {
  save: async (req, res) => {
    try {
      const formData = req.body;
      const newForm = new Form(formData);
      const savedForm = await newForm.save();
      res.status(200).json({ success: true, data: savedForm });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },
  forms: async (req, res) => {
    try {
      const forms = await Form.find();
      const formattedForms = forms.map((form) => ({
        name: form.name,
        ageOrSex: `${form.age}/${form.sex}`,
        mobile: form.mobile,
        address: form.address,
        govtId: `${form.govtIdType}-${form.govtId}`,
        guardianDetails: `(${form.guardianNameLabel}) ${form.guardianName}  - ${form.guardianEmail} - ${form.emergencyContactPhone}`,
        nationality: form.nationality,
      }));
      res.status(200).json({ success: true, data: formattedForms });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

module.exports = formController;
