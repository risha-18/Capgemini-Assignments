// Function to store user registration data in localStorage
function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const categories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(input => input.value);

    // Store registration data in localStorage
    const userData = {
        name,
        age,
        email,
        password,
        categories
    };

    // Check if user already exists
    if (localStorage.getItem(email)) {
        alert("This email is already registered. Please login.");
        return;
    }

    // Save user data in localStorage
    localStorage.setItem(email, JSON.stringify(userData));

    alert("Registration successful! Please login to continue.");
    window.location.href = 'login.html'; // Redirect to login page
}

// Function to handle user login
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem(email));

    if (userData && userData.password === password) {
        // Successfully logged in
        alert("Login successful!");
        window.location.href = 'books.html'; // Redirect to books page
    } else {
        // Invalid login
        alert("Invalid email or password. Please try again.");
    }
}

// Function to display books categorized by category
function displayBooks() {
    const booksSection = document.getElementById('booksSection');

    // Books categorized by types
    const booksByCategory = {
        "Fiction": [
            { title: "The Great Gatsby", description: "A novel by F. Scott Fitzgerald." },
            { title: "1984", description: "A dystopian social science fiction novel by George Orwell." },
            { title: "Pride and Prejudice", description: "A romantic novel by Jane Austen." },
            { title: "To Kill a Mockingbird", description: "A novel by Harper Lee." },
            { title: "Moby-Dick", description: "A novel by Herman Melville." },
            { title: "The Catcher in the Rye", description: "A novel by J. D. Salinger." },
            { title: "War and Peace", description: "A historical novel by Leo Tolstoy." },
            { title: "Crime and Punishment", description: "A novel by Fyodor Dostoevsky." },
            { title: "Brave New World", description: "A science fiction novel by Aldous Huxley." },
            { title: "The Hobbit", description: "A fantasy novel by J.R.R. Tolkien." }
        ],
        "Non-Fiction": [
            { title: "Sapiens: A Brief History of Humankind", description: "A non-fiction book by Yuval Noah Harari." },
            { title: "Educated", description: "A memoir by Tara Westover." },
            { title: "Becoming", description: "A memoir by Michelle Obama." },
            { title: "The Immortal Life of Henrietta Lacks", description: "A biography of Henrietta Lacks." },
            { title: "The Wright Brothers", description: "A biography of the Wright brothers." },
            { title: "The Diary of a Young Girl", description: "A book by Anne Frank." },
            { title: "Into the Wild", description: "A biography by Jon Krakauer." },
            { title: "The Glass Castle", description: "A memoir by Jeanette Walls." },
            { title: "The Power of Habit", description: "A book by Charles Duhigg." },
            { title: "Outliers", description: "A book by Malcolm Gladwell." }
        ],
        "Novels": [
            { title: "Anna Karenina", description: "A novel by Leo Tolstoy." },
            { title: "The Brothers Karamazov", description: "A novel by Fyodor Dostoevsky." },
            { title: "Great Expectations", description: "A novel by Charles Dickens." },
            { title: "The Grapes of Wrath", description: "A novel by John Steinbeck." },
            { title: "Wuthering Heights", description: "A novel by Emily Brontë." },
            { title: "The Picture of Dorian Gray", description: "A novel by Oscar Wilde." },
            { title: "Les Misérables", description: "A novel by Victor Hugo." },
            { title: "Frankenstein", description: "A novel by Mary Shelley." },
            { title: "Dracula", description: "A novel by Bram Stoker." },
            { title: "Jane Eyre", description: "A novel by Charlotte Brontë." }
        ],
        "Kids Education": [
            { title: "The Very Hungry Caterpillar", description: "A children's book by Eric Carle." },
            { title: "Where the Wild Things Are", description: "A children's book by Maurice Sendak." },
            { title: "Matilda", description: "A children's novel by Roald Dahl." },
            { title: "Charlotte's Web", description: "A children's novel by E. B. White." },
            { title: "Harry Potter and the Sorcerer's Stone", description: "A fantasy novel by J.K. Rowling." },
            { title: "The Lion, the Witch and the Wardrobe", description: "A children's fantasy novel by C. S. Lewis." },
            { title: "The Little Prince", description: "A novella by Antoine de Saint-Exupéry." },
            { title: "Alice's Adventures in Wonderland", description: "A novel by Lewis Carroll." },
            { title: "The Tale of Peter Rabbit", description: "A children's book by Beatrix Potter." },
            { title: "Anne of Green Gables", description: "A novel by L. M. Montgomery." }
        ],
        "Science": [
            { title: "A Brief History of Time", description: "A book by Stephen Hawking." },
            { title: "The Selfish Gene", description: "A book by Richard Dawkins." },
            { title: "The Origin of Species", description: "A book by Charles Darwin." },
            { title: "The Gene: An Intimate History", description: "A book by Siddhartha Mukherjee." },
            { title: "Cosmos", description: "A book by Carl Sagan." },
            { title: "The Emperor of All Maladies", description: "A biography of cancer by Siddhartha Mukherjee." },
            { title: "Fermat's Enigma", description: "A book by Simon Singh." },
            { title: "The Man Who Knew Infinity", description: "A biography of mathematician Srinivasa Ramanujan." },
            { title: "The Structure of Scientific Revolutions", description: "A book by Thomas S. Kuhn." },
            { title: "Astrophysics for People in a Hurry", description: "A book by Neil deGrasse Tyson." }
        ],
        "Technology": [
            { title: "The Innovators", description: "A book by Walter Isaacson." },
            { title: "Steve Jobs", description: "A biography of Steve Jobs by Walter Isaacson." },
            { title: "The Second Machine Age", description: "A book by Erik Brynjolfsson." },
            { title: "How We Got to Now", description: "A book by Steven Johnson." },
            { title: "The Shallows", description: "A book by Nicholas Carr." },
            { title: "The Code Book", description: "A book by Simon Singh." },
            { title: "Wired", description: "A book by Steven Levy." },
            { title: "The Lean Startup", description: "A book by Eric Ries." },
            { title: "Zero to One", description: "A book by Peter Thiel." },
            { title: "The Phoenix Project", description: "A book by Gene Kim." }
        ],
        "Magazines": [
            { title: "TIME", description: "An American news magazine." },
            { title: "National Geographic", description: "A magazine known for its photographs and articles." },
            { title: "The New Yorker", description: "A magazine covering various topics." },
            { title: "Forbes", description: "A magazine focusing on business, investing, and lifestyle." },
            { title: "The Economist", description: "A British weekly newspaper focusing on global issues." },
            { title: "Nature", description: "A scientific journal." },
            { title: "The New York Times", description: "An American newspaper." },
            { title: "Scientific American", description: "A science and technology magazine." },
            { title: "Wired", description: "A technology and culture magazine." },
            { title: "Vogue", description: "A fashion and lifestyle magazine." }
        ]
    };

    // Generate book cards for each category
    for (const [category, books] of Object.entries(booksByCategory)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.innerHTML = `<h3>${category}</h3>`;
        booksSection.appendChild(categoryDiv);

        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.innerHTML = `
                <h4>${book.title}</h4>
                <p>${book.description}</p>
                <button>Read More</button>
            `;
            categoryDiv.appendChild(bookCard);
        });
    }
}

// Initialize the page with books display
document.addEventListener('DOMContentLoaded', displayBooks);

// Attach event listeners to forms
document.getElementById('registrationForm')?.addEventListener('submit', registerUser);
document.getElementById('loginForm')?.addEventListener('submit', loginUser);