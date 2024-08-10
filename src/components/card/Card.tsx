import React from 'react';
import styles from "./card.module.css";
const Card = () => {
    return (
        <div className={styles.container}>
            <img className={styles.image} src="/images/OnePlus.jpg" alt="OnePlus smartphone"/>
            <p>OnePlus 12 5G Dual CPH2581 512GB 16GB RAM Factory</p>
            <p>The OnePlus 12 is an advanced phone with a 6.82-inch screen,
                an advanced camera system with cameras capable of 50+64+48 megapixels.
                It is also equipped with a powerful 5400mAh battery,
                Snapdragon® 8 Gen 3 Mobile Platform chipset,
                and OxygenOS 14.0 operating system based on Android™ 14.
                With a storage capacity of 512GB and 16GB of RAM,
                it provides impressive performance and extensive storage.
                Support for eSim and fast charging with 100W SUPERVOOC
                technology complement the advanced user experience of this phone.</p>
            <p>Price: $188.90</p>
        </div>
    );
};
// .container {
//     display: flex;
//     flex-direction: column;
// }
// .image {
//     max-width: 400px;
//     object-fit: contain;
// }

export default Card;