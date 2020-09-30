<p align="center">
   <img src=".github/logo.png?raw=true" alt="Proffy" width="280"/>
</p>

<p>
<h4 align="center">
 :rocket: NextLevelWeek 2.0 :rocket:
</h4>
<p align="center">
   <img src=".github/nlw.jpg" alt="Proffy" width="280"/>
</p>
</p>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/styllth/Proffy-NLW2.0?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/styllth/Proffy-NLW2.0">

  <a href="https://www.linkedin.com/in/styllth/">
    <img alt="Made by Styllth" src="https://img.shields.io/badge/made%20by-Styllth-%2304D361">
  </a>

  <a href="https://github.com/styllth/Proffy-NLW2.0/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/styllth/Proffy-NLW2.0">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">

  <a href="https://github.com/styllth/Proffy-NLW2.0/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/styllth/Proffy-NLW2.0?style=social">
  </a>
</p>

# Índice

<p align="center">

[NLW](#nlw) -
[Sobre](#sobre) -
[Layout](#layout) -
[Documentação](#documentacao) -
[Tecnologias Utilizadas](#tecnologias-utilizadas) -
[Como rodar este projeto](#como-rodar) -
[Como Contribuir](#como-contribuir) -
[Licença](#licenca)

</p>

<a id="nlw"></a>

## :information_source: O que é o Next Level Week

O NLW é uma experiência online com muito conteúdo prático, desafios e hacks que vão te ajudar a avançar para o próximo nível.

<a id="sobre"></a>

## :bookmark: Sobre o projeto

Este projeto foi desenvolvido na Trilha **Booster** durante a **Next Level Week** distribuída pela [Rocketseat](https://rocketseat.com.br/).

**Proffy** é uma plataforma online cujo objetivo é conectar estudantes e professores.

Os professores poderão cadastrar suas aulas informando data, hora e valor de cada aula, e os alunos poderão realizar a busca das aulas cadastradas.

<p align="center">
  <img alt="Proffy" src=".github/proffy.png" width="100%">
</p>

<a id="layout"></a>

## :art: Layout

Nos links abaixo você encontra o layout do projeto web e também do mobile.

- [Layout Web](https://www.figma.com/file/GHGS126t7WYjnPZdRKChJF/Proffy-Web)
- [Layout Mobile](https://www.figma.com/file/e33KvgUpFdunXxJjHnK7CG/Proffy-Mobile)

Lembrando que você precisa ter uma conta no [Figma](http://figma.com/) para acessá-lo.

<a id="tecnologias-utilizadas"></a>

## :rocket: Tecnologias Utilizadas

<img
 src=".github/tecnologies.png?raw=true"
 width="280px"
 height="240px"
 align="right"
/>

O projeto foi desenvolvido utilizando as seguintes tecnologias

- [Node.js](https://nodejs.org/en/)
- [ReactJS](https://reactjs.org/)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)

Foi utilizado o conceito de mono-repo para criação do projeto.

<a id="como-rodar"></a>

## :rocket: Como rodar este projeto

Podemos considerar este projeto como sendo divido em três partes:

1. Back End (pasta server)
2. Front End (pasta web)
3. Mobile (pasta mobile)

:bulb: Tanto o Front End quanto o Mobile precisam que o Back End esteja sendo executado para funcionar.

- ### **Pré-requisitos**

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
**[Git](https://git-scm.com)**
**[Node.js](https://nodejs.org/en/)**
**[Expo](https://expo.io/)**

Além disto é bom ter um editor para trabalhar com o código.
Neste projeto foi usado o [VSCode](https://code.visualstudio.com/)

- ### Baixando o projeto

```bash
# Clone este repositório
$ git clone https://github.com/styllth/Proffy-NLW2.0.git

# Acesse a pasta do projeto no terminal
$ cd Proffy-NLW2.0

# Instale as dependências
$ yarn

```

- ### :gear: Rodando o Back End (servidor)

```bash
# Execute a aplicação em modo de desenvolvimento
$ yarn start:server

# O servidor inciará na porta:3333 - acesse http://localhost:3333
```

- ### :world_map: Rodando a aplicação web (Front End)

```bash
# Execute a aplicação em modo de desenvolvimento
$ yarn start:web

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```

- ### :iphone: Rodando a aplicação mobile

```bash
# Execute o app em modo de desenvolvimento
$ yarn start:mobile

# Usando o Expo, basta digitalizar o qrcode no terminal ou na página da exposição

# Se houver algum problema com as fontes, execute:
$ expo install expo-font @expo-google-fonts/ubuntu @expo-google-fonts/roboto
```

<a id="como-contribuir"></a>

## :smirk: Como contribuir para o projeto

- Faça um Fork desse repositório,
- Crie uma branch com as suas alterações: `git checkout -b my-feature`
- Commit suas mudanças contando o que você fez: `git commit -m "feature: My new feature"`
- Envie as suas alterações: `git push origin my-feature`

> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://github.com/firstcontributions/first-contributions)

<a id="licenca"></a>

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

<p>
<h4 align="center">
    Feito com ❤️ by <a href="https://www.linkedin.com/in/styllth/" target="_blank">Styllth</a>
</h4>
</p>
