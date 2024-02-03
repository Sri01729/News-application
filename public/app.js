document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const topStoriesContainer = document.getElementById('topStories');

    // Feathers client setup
    const app = feathers();
    const restClient = feathers.rest('http://localhost:3030');
    app.configure(restClient.fetch(window.fetch.bind(window)));

    document.getElementById('refreshButton').addEventListener('click', function () {
        // Refresh the page
        location.reload();
    });

    // Fetch and display top stories when the search button is clicked
    searchButton.addEventListener('click', async () => {
        const searchKeyword = searchInput.value.trim();
        console.log('search button clicked');

        if (!searchKeyword) {
            alert('Please enter a search keyword.');
            return;
        }

        const apiKey = 'V7qZUlouUBKj2hGlAvb4m1QK0sD7G625';
        const apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchKeyword}&api-key=${apiKey}`;

        try {

            const response = await fetch(apiUrl);
            const data = await response.json();

            // Log the fetched data to the console
            console.log('Fetched Data:', data);

            if (data.response.docs.length === 0) {
                displayMessage('No articles found. Please enter a more meaningful keyword. Refresh the page and try it again.');
                return;
            }

            // Function to display messages in the message container
            function displayMessage(message) {
                // Clear previous messages
                messageContainer.innerHTML = '';

                // Create a div for the message
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');

                // Create a paragraph element for the message
                const messageParagraph = document.createElement('p');
                messageParagraph.textContent = message;

                // Append the paragraph to the message div
                messageDiv.appendChild(messageParagraph);

                // Append the message div to the message container
                messageContainer.appendChild(messageDiv);
            }
            // Clear previous results
            topStoriesContainer.innerHTML = '';

            // Display top stories as grid
            data.response.docs.forEach(async story => {
                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');

                const headline = document.createElement('h3');
                headline.textContent = story.headline.main;

                const snippet = document.createElement('p');
                snippet.textContent = story.snippet;

                // Check if multimedia is available
                if (story.multimedia && story.multimedia.length > 0) {
                    const imageUrl = `https://www.nytimes.com/${story.multimedia[0].url}`;
                    const image = document.createElement('img');
                    image.src = imageUrl;
                    image.alt = 'Story Image';
                    gridItem.appendChild(image);
                }

                gridItem.appendChild(headline);
                gridItem.appendChild(snippet);



                // Add link to the full article
                const fullArticleLink = document.createElement('a');
                fullArticleLink.textContent = 'Read Full Article';
                fullArticleLink.href = story.web_url;
                fullArticleLink.target = '_blank'; // Open link in a new tab
                gridItem.appendChild(fullArticleLink);

                topStoriesContainer.appendChild(gridItem);

                try {
                    await app.service('items').create({
                        text: searchKeyword, quantity: 1, headline: story.headline.main,
                        snippet: story.snippet,
                        imageURL: story.multimedia && story.multimedia.length > 0 ? `https://www.nytimes.com/${story.multimedia[0].url}` : null,
                        fullArticleLink: story.web_url,
                    });
                } catch (error) {
                    console.error('Error creating item:', error);
                }

            });

        } catch (error) {
            console.error('Error fetching top stories:', error);
        }
    });
});
