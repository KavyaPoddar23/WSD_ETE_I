const baseURL = "https://api.nytimes.com/svc/books/v3/lists/2019-01-20/hardcover-fiction.json?api-key=QTd4H7HDVpLKhqIqtV42NmAthrt8ub4b";

let books = [];
let filteredBooks = [];
let currentPage = 1;
const booksPerPage = 4;

window.onload = () => {
    const fetchButton = document.getElementById("fetchButton");
    const searchInput = document.getElementById("search");
    const sortSelect = document.getElementById("sort");
    const rankFilterSelect = document.getElementById("rankFilter");
    const loadingElement = document.getElementById("loading");
    const errorMessage = document.getElementById("errorMessage");

    fetchButton.addEventListener('click', async () => {
        loadingElement.style.display = "block";
        errorMessage.style.display = "none";
        document.getElementById("bookList").innerHTML = "";

        try {
            const response = await fetch(baseURL);
            const data = await response.json();
            books = data.results.books;

            applyFilters();
        } catch (error) {
            errorMessage.textContent = "Failed to fetch data.";
            errorMessage.style.display = "block";
        } finally {
            loadingElement.style.display = "none";
        }
    });

    const applyFilters = () => {
        const searchQuery = searchInput.value.toLowerCase();
        const selectedRank = rankFilterSelect.value;
        const sortCriteria = sortSelect.value;

        filteredBooks = books.filter(book => {
            const matchesTitle = book.title.toLowerCase().includes(searchQuery);
            const matchesRank = selectedRank === "" || book.rank == selectedRank;

            return matchesTitle && matchesRank;
        });

        sortBooks(sortCriteria);
        displayBooks();
    };

    const sortBooks = (criteria) => {
        filteredBooks.sort((a, b) => {
            if (criteria === "title") {
                return a.title.localeCompare(b.title);
            } else if (criteria === "author") {
                return a.author.localeCompare(b.author);
            } else if (criteria === "description") {
                return a.description.localeCompare(b.description);
            } else if (criteria === "publisher") {
                return a.publisher.localeCompare(b.publisher);
            }
            return 0;
        });
    };

    const displayBooks = () => {
        const bookListElement = document.getElementById("bookList");
        const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
        const start = (currentPage - 1) * booksPerPage;
        const end = currentPage * booksPerPage;

        bookListElement.innerHTML = filteredBooks.slice(start, end).map(book => `
            <div class="book-item">
                <img src="${book.book_image}" class="book-image" width="100" height="100" />
                <div class="book-info">
                    <div class="book-title">Title: ${book.title}</div>
                    <div class="book-author">Author: ${book.author}</div>
                    <div class="book-desc">Description: ${book.description}</div>
                    <div class="book-publisher">Publisher: ${book.publisher}</div>
                    <div class="book-rank">Rank: ${book.rank}</div>
                </div>
            </div>
        `).join('');

        updatePagination(totalPages);
    };

    const updatePagination = (totalPages) => {
        const paginationDiv = document.getElementById("pagination");

        paginationDiv.innerHTML = `
            <button ${currentPage === 1 ? 'class="disabled"' : ''} onclick="changePage(-1)">Previous</button>
            <button ${currentPage === totalPages ? 'class="disabled"' : ''} onclick="changePage(1)">Next</button>
        `;
    };

    window.changePage = (direction) => {
        currentPage += direction;
        displayBooks();
    };

    searchInput.addEventListener('input', applyFilters);
    sortSelect.addEventListener('change', applyFilters);
    rankFilterSelect.addEventListener('change', applyFilters);
};
