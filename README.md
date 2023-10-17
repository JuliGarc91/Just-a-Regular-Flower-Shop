# Welcome to *Botanic Haven*!
<img src="https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/Chrysanthemum_50509390263_MS.jpg" alt="Chrysanthemum" width="500">

###### photo credit: *Chrysanthemum* 'Hillside Sheffield Pink' in the Rose Arc Pool by Michael Stewart

## Description
At our plant shop, you'll discover a diverse and vibrant collection of botanical wonders that encompass a wide spectrum of colors, shapes, and sizes. Whether you're an avid green thumb or just beginning your journey into the world of plants, we have something for everyone.

Our inventory includes a rich selection of plant species, each with its own unique characteristics:

1. **Rosy Pussytoes:** These maroon-hued beauties add a touch of elegance to any garden.
2. **Parrot-lily:** Vibrant turquoise blooms that evoke the lushness of the tropics.
3. **Hudson Bay Currant:** Sporting striking fuchsia shades, this plant is both captivating and elegant.
4. **Dentate False Pennyroyal:** Fiery red leaves that bring a burst of color to your landscape.
5. **Dot Lichen:** With deep crimson hues, these lichens are nature's artwork.
6. **Southern Swamp Aster:** Delicate pink petals that brighten up any outdoor space.
7. **Forest Naupaka:** The subtle khaki tones of this plant blend seamlessly with natural surroundings.
8. **Madrone:** Blue-green foliage and intricate branches make this a standout in any garden.
9. **Globe Cactus:** Bold and striking in various shades, from black and gray to vibrant orange.
10. **Talh:** A lovely green addition that brings a sense of freshness to your space.

We offer a range of plants, from flowering marvels to lush greenery, to suit your specific preferences and gardening needs. Whether you're looking to create a colorful, blooming oasis or a serene, green sanctuary, our diverse collection has you covered.

While some of our plants are currently out of stock, our dedicated team is always on hand to assist you in finding the perfect addition to your plant family. We understand that plants bring life and beauty to your environment, and we're committed to providing you with the highest quality botanicals.

So, whether you're a seasoned horticulturist or a novice gardener, our botanical shop is the ideal destination for all your plant-related desires. Explore our vast array of plants, and let nature's splendor fill your life with color and serenity.

## Botanical Shop Features
**Our plant shop provides a range of services to cater to your botanical needs. Here's how you can interact with our store:**

- **Inventory**: To explore our complete inventory, simply use the inventory command. This will provide you with a comprehensive list of all the plants available in our store.

- **Donate a Plant:** If you have a local plant species to contribute, you can use the donatePlant command to add it to our inventory. We appreciate your efforts in preserving local flora.

- **Show a Plant:** If you're looking for a specific plant or want to filter plants based on their availability, you can use the showItem command. Just specify the plant name and, if desired, an in-stock filter to narrow down your search.

- **Purchase a Plant:** Ready to bring some greenery into your life? The purchasePlant command allows you to buy plants from our store. Select the plant you desire, and our team will assist you with the purchase process.

- **Update Transaction:** In case you need to modify a previous transaction, the update command comes in handy. Provide the transaction ID, and we'll help you make the necessary adjustments.

- **Cancel Transaction:** If, for any reason, you need to cancel an entire transaction and receive a refund (refund can take up to 3 business days depending on your financial institution), you can use the cancel command. Just provide the transaction ID, and we'll take care of the cancellation process.

We're here to ensure that your experience with us is as smooth and enjoyable as possible. Feel free to use these commands to explore, contribute, purchase, and manage your transactions. Our team of experts is always ready to assist you in any way we can, whether you're a seasoned plant enthusiast or just starting your botanical journey.

---
## Getting started
Welcome to our Botanic Shop Application! With this user-friendly interface, you can easily donate plants to support our ecosystem, make plant purchases, view our extensive inventory, and perform various operations using terminal commands. To interact with the application seamlessly, simply use the following commands, and remember to use quotation marks when entering multi-word values.

1. Fork and clone this repository.

2. Navigate to the cloned repository's directory on your command line. Then, run the following command:

```bash
npm install
```
This will install the libraries needed to run the dependencies required to run the botanic shop.

Open up the repository in VSCode or any text editor with node.js to be able to use the following commands and perform various actions.  

## Botanic Shop Application Usage

```bash
npm run donatePlant "New Mexico Raspberry" pink
```

1. **Show Inventory**
   - To get a comprehensive view of our store's inventory, execute this command:
     ```bash
     npm run inventory
     ```

2. **Donate a Plant**
   - Contribute to our plant inventory by donating a new plant (provided it's a local species). Utilize the following command:
     ```bash
     npm run donatePlant <plantName> <color>
     ```
     (Please ensure you fill in all required fields.)

3. **Show Plant**
    - Discover detailed information about a plant by specifying its name and optionally filtering by its in-stock status.

    To use this feature, execute the following command in your terminal:
    ```bash
    npm run showItem <plantName> [inStock]
    ```

   - The `inStock` input is optional and allows you to filter plants by their in-stock status. You can specify it as 'true' or 'false' to check the availability of the item.

#### Example Usage

1. **Show all available variants of a plant:**

   - Input:
     ```bash
     npm run showItem "Globe Cactus"
     ```

   - Output:
     ```javascript
     [
       {
         plantName: 'Globe Cactus',
         dominantColor: 'Yellow',
         priceInCents: 1435,
         inStock: true
       },
       {
         plantName: 'Globe Cactus',
         dominantColor: 'Black',
         priceInCents: 3297,
         inStock: false
       },
       {
         plantName: 'Globe Cactus',
         dominantColor: 'Gray',
         priceInCents: 4452,
         inStock: true
       },
       {
         plantName: 'Globe Cactus',
         dominantColor: 'Orange',
         priceInCents: 558,
         inStock: true
       }
     ]
     ```

2. **Show only in-stock variants of a plant:**

   - Input:
     ```bash
     npm run showItem "Globe Cactus" true
     ```

   - Output:
     ```javascript
     [
       {
         plantName: 'Globe Cactus',
         dominantColor: 'Yellow',
         priceInCents: 1435,
         inStock: true
       },
       {
         plantName: 'Globe Cactus',
         dominantColor: 'Gray',
         priceInCents: 4452,
         inStock: true
       },
       {
         plantName: 'Globe Cactus',
         dominantColor: 'Orange',
         priceInCents: 558,
         inStock: true
       }
     ]
     ```

3. **Show only out-of-stock variants of a plant:**

   - Input:
     ```bash
     npm run showItem "Globe Cactus" false
     ```

   - Output:
     ```javascript
     [
       {
         plantName: 'Globe Cactus',
         dominantColor: 'Black',
         priceInCents: 3297,
         inStock: false
       }
     ]
     ```

Feel free to use this command to explore and retrieve information about different plant variants.

4. **Purchase Plant**
   - Make a purchase effortlessly by issuing this command:
     ```bash
     npm run purchasePlant <plantName> <color> <quantity> <customerFullName>
     ```
     (Ensure all four fields are filled out for a smooth transaction.)

5. **Update Transaction**
   - Modify an existing transaction using this command. Remember, the identifier is case-sensitive. To remove your name, simply leave the fifth field blank:
     ```bash
     npm run update <newPlantName> <newColor> <newQuantity> <identifier> <editCustomerFullName>
     ```

6. **Cancel Transaction**
   - If you need to cancel an entire transaction, you can do so with this command. Make sure you fill in all the required fields:
     ```bash
     npm run cancel <transactionId>
     ```

7. **Other Functions**
   - In addition to the core commands, you can also run tests using Jest for quality assurance by running:
     ```bash
     npm test
     ```

With these commands at your disposal, you can efficiently manage our plant shop's inventory, donate plants, access plant details, make purchases, update transactions, and cancel transactions. Thank you for supporting our mission! 🌿

### Author

- Julissa Garcia

### Dependencies

### Runtime Dependencies

- `lolcats` (^2.0.1)

### Development Dependencies

- `@faker-js/faker` (^8.1.0)
- `jest` (^29.7.0)
```