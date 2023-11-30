const pool = require('../config/database');


async function listarLivros() {
    const [results] = await pool.query('SELECT * FROM livros');
    const [autores] = await pool.query('SELECT * FROM autores');
    const [editoras] = await pool.query('SELECT * FROM editoras');
    const newResults = results.map(livro =>{
        return {
            id: livro.id,
            titulo: livro.titulo,
            dataPublicacao: livro.dataPublicacao,
            nomeAutor: autores.filter(autor => {
                if(autor.id === livro.id_autor) {
                    return autor.nome
                }
            })[0].nome,
            nomeEditora: editoras.filter(editora => {
                if(editora.id === livro.id_editora) {
                    return editora.nome
                }
            })[0].nome
          }
    })
    return newResults;
}
async function adicionarLivro(livro) {
    const { titulo, autor, editora,  dataPublicacao } = livro;
    const [results] = await pool.query('INSERT INTO livros (titulo, dataPublicacao, id_autor, id_editora ) VALUES (?, ?, ?, ?)', [titulo, dataPublicacao, autor, editora]);
    return results.insertId;

    
}

async function atualizarLivro(id, livro) {
    const { titulo, autor, editora, dataPublicacao } = livro;
    await pool.query('UPDATE livros SET titulo = ?, dataPublicacao = ? , id_autor = ?, id_editora = ? WHERE id = ?', [titulo, dataPublicacao, autor, editora , id]);
}

async function deletarLivro(id) {
    await pool.query('DELETE FROM livros WHERE id = ?', [id]);
}

module.exports = {
    listarLivros,
    adicionarLivro,
    atualizarLivro,
    deletarLivro
};