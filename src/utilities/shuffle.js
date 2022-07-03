const shuffle = () => {
    const assets = [
        {image: '/assets/bird.png'},
        {image: '/assets/cat.png'},
        {image: '/assets/chicken.png'},
        {image: '/assets/cow.png'},
        {image: '/assets/elephant.png'},
        {image: '/assets/gorilla.png'},
        

    ];
    return [...assets, ...assets].sort(
        () => Math.random() - 0.5
    ).map((card) => ({...card, id: Math.random()}) );
};
export default shuffle;

