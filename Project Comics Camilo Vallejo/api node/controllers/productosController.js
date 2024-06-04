const db = require('../db');

exports.obtenercomics = (req, res) => {
  db.query('SELECT * FROM comics', (error, resultados) => {
    if (error) {
      console.error('Error al obtener comics:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({estado:201, comics: resultados});
  });
};


exports.crearcomic = (req, res) => {
  console.log(req)
  const { nombre, precio, descripcion } = req.body;
  const imagen = req.file.path;
  db.query('INSERT INTO comics (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)', [nombre, descripcion, precio, imagen], (err, result) => {
    if (err) {
      console.error('Error al insertar comic:', err);
      res.status(500).json({ error: 'Error al insertar comic en la base de datos' });
      return;
    }
    res.json({ estado: 201, mensaje: "Guardado exitosamente" });
  });
};

exports.obtenercomicId = (req, res) => {
  const { id } = req.params;
    // Realiza la consulta SQL para obtener el comic por su ID
    const sql = 'SELECT * FROM comics WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al obtener el comic:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
  
      // Verifica si se encontró un comic con el ID especificado
      if (result.length === 0) {
        res.json({ estado:404, mensaje: 'comic no encontrado' });
        return;
      }
      // const imagenConPrefijo = `data:image/jpeg;base64,${result[0].imagen}`;

     

      // Si se encontró el comic, devuélvelo como respuesta
      res.json({estado:201, comic: result[0]});
    })
};

exports.updateProduct =  (req, res) => {
  const { id } = req.params;
  const { nombre, precio, descripcion } = req.body;
  const imagen = req.file.path;

// Verificar si el ID del comic existe
const sqlVerificar = 'SELECT * FROM comics WHERE id = ?';
db.query(sqlVerificar, [id], (err, result) => {
  if (err) {
    console.error('Error al verificar el comic:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
    return;
  }

  // Si no se encontró un comic con el ID especificado, devolver un error
  if (result.length === 0) {
    res.status(404).json({ estado: 404, mensaje: 'El comic no existe' });
    return;
  }

  db.query('UPDATE comics SET nombre = ?, precio = ?, descripcion = ?, imagen = ? WHERE id = ?', [nombre, precio, descripcion, imagen,id], (err, result) => {
    console.log(result)
    if (err) {
      console.error('Error al actualizar comic:', err);
      res.status(500).json({ error: 'Error al actualizar comic en la base de datos' });
      return;
    }

     // Verifica si se encontró un comic con el ID especificado
     if (result.length === 0) {
      res.json({ estado:404, mensaje: 'comic no encontrado' });
      return;
    }
    res.json({ estado: 201, mensaje: "comic actualizado exitosamente"});
  });
})
};




exports.eliminarcomic =  (req, res) => {
  const { id } = req.params;

  // Verificar si el ID del comic existe
const sqlVerificar = 'SELECT * FROM comics WHERE id = ?';
db.query(sqlVerificar, [id], (err, result) => {
  if (err) {
    console.error('Error al verificar el comic:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
    return;
  }

  // Si no se encontró un comic con el ID especificado, devolver un error
  if (result.length === 0) {
    res.status(404).json({ estado: 404, mensaje: 'El comic no existe' });
    return;
  }

  db.query('DELETE FROM comics WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar comic:', err);
      res.status(500).json({ error: 'Error al eliminar comic de la base de datos' });
      return;
    }
    res.json({estado:201, mensaje:'comic eliminado'});
  });

})
  
};






// module.exports = { obtenercomics };


// Agregar el resto de las funciones CRUD (crearcomic, obtenercomic, actualizarcomic, eliminarcomic)
