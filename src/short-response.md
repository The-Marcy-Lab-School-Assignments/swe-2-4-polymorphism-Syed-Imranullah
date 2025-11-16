# Short Responses

For this short response assignment, aim to write a response with the following qualities (your instructor will give you feedback on these areas):
- [] Addresses all parts of the prompt
- [] Accurately uses relevant technical terminology
- [] Is free of grammar and spelling mistakes (double check with grammarly!)
- [] Uses markdown to enhance readability (preview in VS Code with Command/Control + Shift + V)
- [] Is easy to comprehend

For each prompt below, write your response in the space provided. Aim to answer each prompt in 2-5 concise sentences. Make sure to preview your markdown to check how it is rendered before submitting.

## Prompt 1

Examine this code:

```js
class Shape {
  constructor(type) {
    this.type = type;
  }
  getArea() {
    return 0;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super('circle');
    this.radius = radius;
  }
  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  constructor(side) {
    super('square');
    this.side = side;
  }
  getArea() {
    return this.side ** 2;
  }
}

const shapes = [new Circle(5), new Square(4), new Circle(3)];
const totalArea = shapes.reduce((sum, shape) => sum + shape.getArea(), 0);
```

Explain how this code demonstrates **polymorphism**. Why can we call `getArea()` on each shape without checking what type of shape it is?

## Response 1
This code shows polymorphism because Circle and Square both come from the Shape class and each provides its own version of getArea(). Since they share the same method name, the code can call shape.getArea() without checking which type of shape it is. JavaScript automatically runs the correct method based on the object, which makes the reduce function work consistently for all shapes.
---

## Prompt 2

Look at this code:

```js
class Media {
  constructor(title) {
    this.title = title;
  }
  play() { 
    return `Playing media: ${this.title}`; 
  }
}

class Song {
  constructor(title, artist) {
    this.title = title;
    this.artist = artist;
  }
  playSong() {
    return `♪ Playing "${this.title}" by ${this.artist}`;
  }
}

class Podcast {
  constructor(title, host) {
    this.title = title;
    this.host = host;
  }
  playPodcast() {
    return `🎙️ Playing podcast "${this.title}" hosted by ${this.host}`;
  }
}

const playlist = [
  new Song("Thriller", "Michael Jackson"),
  new Podcast("CodeNewbie", "Saron Yitbarek"),
  new Media("voice-memo.mp3")
];

playlist.forEach(item => {
  if (item instanceof Song) {
    console.log(item.playSong());
  } else if (item instanceof Podcast) {
    console.log(item.playPodcast());
  } else {
    console.log(item.play());
  }
});
```

This code works, but it has some problems. Answer the following:

1. Rewrite the `Song` and `Podcast` classes to use inheritance and polymorphism. What changes would you make?
2. After your changes, rewrite the `playlist.forEach()` loop. How does polymorphism simplify this code?
3. Explain what would happen if you wanted to add a new `Video` class. Compare how much work it would take with the original code versus your improved version.

## Response 2

1. To use inheritance, I would make Song and Podcast extend the Media class and call super(title) in their constructors. I would also replace their separate methods (playSong and playPodcast) with a single play() method that overrides the one in Media. This lets all media types share the same structure while still having their own behavior. Below I have provided the updated code:

```js
class Media {
  constructor(title) {
    this.title = title;
  }
  play() { 
    return `Playing media: ${this.title}`; 
  }
}

class Song extends Media {  // extend
  constructor(title, artist) {
    super(title);           // Using super
    this.artist = artist;
  }
  play() {                  //using single play method
    return `♪ Playing "${this.title}" by ${this.artist}`;
  }
}

class Podcast extends Media{      //extend
  constructor(title, host) {
    super(title);                  // Using super
    this.host = host;
  }
  play() {                       //using single play method
    return `🎙️ Playing podcast "${this.title}" hosted by ${this.host}`;
  }
}

const playlist = [
  new Song("Thriller", "Michael Jackson"),
  new Podcast("CodeNewbie", "Saron Yitbarek"),
  new Media("voice-memo.mp3")
];

playlist.forEach(item => { // fixed for loop explained below
  console.log(item.play());
})
```

2. With polymorphism, every item in the playlist uses the same play() method name, so the loop no longer needs instanceof checks. The loop becomes much simpler: playlist.forEach(item => console.log(item.play()));. JavaScript automatically runs the correct version of play() based on the object’s class.

```js
playlist.forEach(item => {
  console.log(item.play());
})
```

3. In the original code, adding a new Video class would require updating both the class itself and the forEach loop to handle another condition. In the improved version, you only need to create the new class with its own play() method. The loop stays the same, which makes the code easier to extend and maintain. Here is an exaple below: 
```js
class Video extends Media {
  constructor(title, duration) {
    super(title);
    this.duration = duration; 
  }

  play() {
    return `📺 Playing video "${this.title}" (${this.duration} long)`;
  }
}