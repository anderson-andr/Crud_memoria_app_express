


let produtos = [
    {id:1, nome:"Arroz", preco: 4.5},
    {id:2, nome:"Bolacha", preco:2.5},
    {id:3, nome:"Doritos", preco:15},
    {id:4, nome:"Chocolate", preco: 5.8}
];
let idGerado = 5;



exports.listar = (req, res ) => {
    res.json(produtos)

}

exports.inserir  =  (req, res) => {
    const novoProduto = req.body;
    if(novoProduto && novoProduto.nome && novoProduto.preco) {
        novoProduto.id = idGerado++;
        produtos.push(novoProduto);
        return res.status(201).json(novoProduto);    
    }
    else {
        return res.status(400).json({
            Erro:"Nome e/ou preco sao obrigatorios"
        })
    }
}

exports.buscarPorId = (req, res) => {
    const id = req.params.id;

    const produtoEncontrado = produtos.find(
        (produto) => {
            return produto.id == id;
        }
    )

    if(produtoEncontrado) {
        return res.json(produtoEncontrado);
    }
    else {
        return res.status(404).json(
            { Erro: "Produto nao encontrado" }
        )
    }

}

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const produtoAlterar = req.body;

    if(!produtoAlterar || !produtoAlterar.nome || !produtoAlterar.preco) {
        return res.status(400).json({
            Erro:"Nome e/ou preco sao obrigatorios"
        });    
    }

    const produtoEncontrado = produtos.find(
        (produto) => {
            return produto.id == id;
        }
    )
    
    if(produtoEncontrado) {
        produtoEncontrado.nome = produtoAlterar.nome;
        produtoEncontrado.preco = produtoAlterar.preco;        
        return res.json(produtoEncontrado);
    }
    else {
        return res.status(404).json(
            { Erro: "Produto nao encontrado" }
        )
    }
}


exports.deletar =  (req, res) => {
 const id = req.params.id;

const indiceProduto = produtos.findIndex(
    (produto) => {
        return produto.id == id;
    }
)

if(indiceProduto >= 0) {
    const produtoDeletado = produtos.splice(indiceProduto, 1)[0]
    return res.json(produtoDeletado);
}
else {
    return res.status(404).json(
        { Erro: "Produto nao encontrado" }
    )
}


}


