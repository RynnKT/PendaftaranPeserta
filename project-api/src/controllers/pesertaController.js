const pesertaModel = require('../models/pesertaModel');
const getAllPeserta = async (req, res) => {
  try {
    const data = await pesertaModel.getAllPeserta();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getPesertaById = async (req, res) => {
  try {
    const data = await pesertaModel.getPesertaById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Peserta tidak ditemukan' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createPeserta = async (req, res) => {
  try {
    const data = { ...req.body };
    
    // Convert empty strings to null for database compatibility
    Object.keys(data).forEach(key => {
      if (data[key] === '' || data[key] === 'null') {
        data[key] = null;
      }
    });

    // Map jk: L/P to 1/2
    if (data.jk === 'L' || data.jk === 'l') data.jk = 1;
    else if (data.jk === 'P' || data.jk === 'p') data.jk = 2;

    if (req.file) {
      data.foto = req.file.filename;
    } else {
      data.foto = null;
    }

    const result = await pesertaModel.createPeserta(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updatePeserta = async (req, res) => {
  try {
    const existing = await pesertaModel.getPesertaById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Peserta tidak ditemukan' });
    }

    const data = { ...req.body };
    
    // Convert empty strings to null for database compatibility
    Object.keys(data).forEach(key => {
      if (data[key] === '' || data[key] === 'null') {
        data[key] = null;
      }
    });

    // Map jk: L/P to 1/2
    if (data.jk === 'L' || data.jk === 'l') data.jk = 1;
    else if (data.jk === 'P' || data.jk === 'p') data.jk = 2;

    if (req.file) {
      data.foto = req.file.filename;
    } else {
      data.foto = existing.foto || null;
    }

    const updated = await pesertaModel.updatePeserta(req.params.id, data);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deletePeserta = async (req, res) => {
  try {
    const data = await pesertaModel.deletePeserta(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Peserta tidak ditemukan' });
    }
    res.json({ message: 'Peserta berhasil dihapus', data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllPeserta,
  getPesertaById,
  createPeserta,
  updatePeserta,
  deletePeserta,
};