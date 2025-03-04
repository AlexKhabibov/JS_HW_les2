// Задание 1

class Library {
    #books = [];

    get allBooks() {
        return this.#books;
    };

    constructor(initialBooks) {
        if (!Array.isArray(initialBooks)) {
            throw new Error('Начальный список книг должен быть предоставлен в виде массива.');
        };

        const uniqueBooks = new Set(initialBooks);
        if (uniqueBooks.size !== initialBooks.length) {
            throw new Error('Начальный список книг не может содержать дубликатов.');
        };
        this.#books = initialBooks;
    };

    get allBooks() {
        return this.#books;
    };

    addBook(title) {
        if (this.#books.includes(title)) {
            throw new Error('Эта книга уже существует в библиотеке.');
        };
        this.#books.push(title);
    };

    removeBook(title) {
        const index = this.#books.indexOf(title);
        if (index === -1) {
            throw new Error('Такой книги нет в библиотеке.');
        };
        this.#books.splice(index, 1);
    };

    hasBook(title) {
        return this.#books.includes(title);
    };
};

const myLibrary = new Library(['Книга 1', 'Книга 2', 'Книга 3']);
console.log(myLibrary.allBooks);

myLibrary.addBook('Книга 4');
console.log(myLibrary.allBooks);

myLibrary.removeBook('Книга 2');
console.log(myLibrary.allBooks);

myLibrary.removeBook('Книга 5');
console.log(myLibrary.allBooks);
console.log(myLibrary.hasBook('Книга 1'));
console.log(myLibrary.hasBook('Книга 2'));





// Задание 2

const initialData = [
    {
        product: "Apple iPhone 14",
        reviews: [
            {
                id: "1",
                text: "Пользуюсь неделю, покупкой доволен",
            },
            {
                id: "2",
                text: "Отличный смартфон, нареканий ноль",
            },
        ],
    },
    {
        product: "Samsung Galaxy S23",
        reviews: [
            {
                id: "3",
                text: "Проверки все прошел, упаковка и комплектация целая, претензий нет. Дальше будет видно по мере использования",
            },
        ],
    },
    {
        product: "Xiaomi 13 Ultra",
        reviews: [
            {
                id: "4",
                text: "Офигенный телефон, Самсунг отдыхает, хорошая мощность, камера, кол-во памяти, и все за приемлемую цену, зарядка 90 ватт просто пушка",
            },
        ],
    },
];

const userInput = document.querySelector('.user_input');
const sendBtn = document.querySelector('.send_btn');
const reviewsContainer = document.querySelector('.reviews');
const errorMsg = document.querySelector('.error_msg');
const productSelect = document.querySelector('.product_select');

// 1️⃣ Функция для отображения отзывов выбранного продукта
function displayReviews() {
    reviewsContainer.innerHTML = ''; // Очищаем список

    const selectedProduct = productSelect.value;
    const productData = initialData.find(item => item.product === selectedProduct);

    if (productData) {
        const productTitle = document.createElement('h3');
        productTitle.textContent = productData.product;
        reviewsContainer.appendChild(productTitle);

        productData.reviews.forEach(review => {
            const reviewElem = document.createElement('p');
            reviewElem.textContent = review.text;
            reviewsContainer.appendChild(reviewElem);
        });
    }
}

// 2️⃣ Отображаем отзывы при изменении выбора продукта
productSelect.addEventListener('change', displayReviews);

// 3️⃣ Добавление нового отзыва
sendBtn.addEventListener('click', function () {
    try {
        const reviewText = userInput.value.trim();

        if (reviewText.length < 20 || reviewText.length > 500) {
            throw new Error('Длина отзыва должна быть от 20 до 500 символов');
        }

        const selectedProduct = productSelect.value;
        const productData = initialData.find(item => item.product === selectedProduct);

        if (productData) {
            const newReview = { id: Date.now().toString(), text: reviewText };
            productData.reviews.push(newReview); // Добавляем в массив
            displayReviews(); // Обновляем отображение
        }

        errorMsg.textContent = ''; // Очищаем ошибки
        userInput.value = ''; // Очищаем поле ввода
    } catch (error) {
        errorMsg.textContent = error.message;
    }
});

// 4️⃣ При загрузке страницы показываем отзывы первого продукта
displayReviews();
