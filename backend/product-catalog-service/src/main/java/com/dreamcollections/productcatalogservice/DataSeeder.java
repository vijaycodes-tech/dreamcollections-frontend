package com.dreamcollections.productcatalogservice;

import com.dreamcollections.productcatalogservice.model.*;
import com.dreamcollections.productcatalogservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SubcategoryRepository subcategoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ColorVariantRepository colorVariantRepository;

    @Autowired
    private MediaRepository mediaRepository;

    @Override
    public void run(String... args) throws Exception {
        // Run seeding only if collections table is empty
        if (categoryRepository.count() == 0) {
            seedCollections();
            seedSubcategories();
            seedProducts();
        }
    }

    private void seedCollections() {
        // Women's Collection
        Category womensCollection = new Category();
        womensCollection.setName("Women's Collection");
        womensCollection.setSlug("womens-collection");
        categoryRepository.save(womensCollection);

        // Men's Collection
        Category mensCollection = new Category();
        mensCollection.setName("Men's Collection");
        mensCollection.setSlug("mens-collection");
        categoryRepository.save(mensCollection);

        // Kids' Collection
        Category kidsCollection = new Category();
        kidsCollection.setName("Kids' Collection");
        kidsCollection.setSlug("kids-collection");
        categoryRepository.save(kidsCollection);

        // Bridal Collection
        Category bridalCollection = new Category();
        bridalCollection.setName("Bridal Collection");
        bridalCollection.setSlug("bridal-collection");
        categoryRepository.save(bridalCollection);
    }

    private void seedSubcategories() {
        Map<String, Category> collections = new HashMap<>();
        categoryRepository.findAll().forEach(cat -> collections.put(cat.getSlug(), cat));

        // Women's subcategories
        Category womens = collections.get("womens-collection");
        createSubcategory("Necklaces", "necklaces", womens);
        createSubcategory("Sets", "sets", womens);
        createSubcategory("Bracelets", "bracelets", womens);
        createSubcategory("Rings", "rings", womens);
        createSubcategory("Earrings", "earrings", womens);

        // Men's subcategories
        Category mens = collections.get("mens-collection");
        createSubcategory("Chains", "chains", mens);
        createSubcategory("Bracelets", "bracelets-mens", mens);
        createSubcategory("Rings", "rings-mens", mens);
        createSubcategory("Watches", "watches", mens);

        // Kids' subcategories
        Category kids = collections.get("kids-collection");
        createSubcategory("Mini Necklaces", "mini-necklaces", kids);
        createSubcategory("Charm Bracelets", "charm-bracelets", kids);
        createSubcategory("Stud Earrings", "stud-earrings", kids);

        // Bridal subcategories
        Category bridal = collections.get("bridal-collection");
        createSubcategory("Mehendi Collection", "mehendi-collection", bridal);
        createSubcategory("Wedding Collection", "wedding-collection", bridal);
    }

    private void createSubcategory(String name, String slug, Category collection) {
        Subcategory subcategory = new Subcategory();
        subcategory.setName(name);
        subcategory.setSlug(slug);
        subcategory.setCollection(collection);
        subcategoryRepository.save(subcategory);
    }

    private void seedProducts() {
        Map<String, Subcategory> subcategories = new HashMap<>();
        subcategoryRepository.findAll().forEach(sub -> subcategories.put(sub.getSlug(), sub));

        // Women's Products
        seedWomensProducts(subcategories);

        // Men's Products
        seedMensProducts(subcategories);

        // Kids' Products
        seedKidsProducts(subcategories);

        // Bridal Products
        seedBridalProducts(subcategories);
    }

    private void seedWomensProducts(Map<String, Subcategory> subcategories) {
        // Necklaces
        Product goldNecklace = createProduct(
            "Elegant Gold Necklace",
            "Beautiful 18k gold necklace with intricate design",
            new BigDecimal("2499.99"),
            "18 inches",
            "elegant-gold-necklace",
            subcategories.get("necklaces")
        );
        addColorVariants(goldNecklace, new String[]{"Gold", "Rose Gold"}, new String[]{"EGN-001-G", "EGN-001-RG"});
        addMedia(goldNecklace, "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500");

        Product pearlNecklace = createProduct(
            "Classic Pearl Necklace",
            "Timeless pearl necklace perfect for any occasion",
            new BigDecimal("1899.99"),
            "16 inches",
            "classic-pearl-necklace",
            subcategories.get("necklaces")
        );
        addColorVariants(pearlNecklace, new String[]{"White", "Cream"}, new String[]{"CPN-001-W", "CPN-001-C"});
        addMedia(pearlNecklace, "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500");

        // Sets
        Product jewelrySet = createProduct(
            "Bridal Jewelry Set",
            "Complete bridal set with necklace, earrings, and bracelet",
            new BigDecimal("4999.99"),
            "One Size",
            "bridal-jewelry-set",
            subcategories.get("sets")
        );
        addColorVariants(jewelrySet, new String[]{"Gold", "Silver"}, new String[]{"BJS-001-G", "BJS-001-S"});
        addMedia(jewelrySet, "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500");
    }

    private void seedMensProducts(Map<String, Subcategory> subcategories) {
        // Chains
        Product goldChain = createProduct(
            "Men's Gold Chain",
            "Heavy gold chain for men with modern design",
            new BigDecimal("3299.99"),
            "22 inches",
            "mens-gold-chain",
            subcategories.get("chains")
        );
        addColorVariants(goldChain, new String[]{"Yellow Gold", "White Gold"}, new String[]{"MGC-001-YG", "MGC-001-WG"});
        addMedia(goldChain, "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500");

        // Watches
        Product luxuryWatch = createProduct(
            "Luxury Men's Watch",
            "Premium automatic watch with leather strap",
            new BigDecimal("5999.99"),
            "42mm",
            "luxury-mens-watch",
            subcategories.get("watches")
        );
        addColorVariants(luxuryWatch, new String[]{"Black", "Brown"}, new String[]{"LMW-001-B", "LMW-001-BR"});
        addMedia(luxuryWatch, "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500");
    }

    private void seedKidsProducts(Map<String, Subcategory> subcategories) {
        // Mini Necklaces
        Product kidsNecklace = createProduct(
            "Kids Butterfly Necklace",
            "Cute butterfly pendant necklace for kids",
            new BigDecimal("299.99"),
            "12 inches",
            "kids-butterfly-necklace",
            subcategories.get("mini-necklaces")
        );
        addColorVariants(kidsNecklace, new String[]{"Pink", "Purple"}, new String[]{"KBN-001-P", "KBN-001-PR"});
        addMedia(kidsNecklace, "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500");
    }

    private void seedBridalProducts(Map<String, Subcategory> subcategories) {
        // Mehendi Collection
        Product mehendiSet = createProduct(
            "Mehendi Special Set",
            "Traditional mehendi jewelry set with intricate patterns",
            new BigDecimal("1999.99"),
            "One Size",
            "mehendi-special-set",
            subcategories.get("mehendi-collection")
        );
        addColorVariants(mehendiSet, new String[]{"Antique Gold", "Silver"}, new String[]{"MSS-001-AG", "MSS-001-S"});
        addMedia(mehendiSet, "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500");

        // Wedding Collection
        Product weddingSet = createProduct(
            "Royal Wedding Set",
            "Exquisite wedding jewelry set fit for royalty",
            new BigDecimal("9999.99"),
            "One Size",
            "royal-wedding-set",
            subcategories.get("wedding-collection")
        );
        addColorVariants(weddingSet, new String[]{"Gold", "Diamond"}, new String[]{"RWS-001-G", "RWS-001-D"});
        addMedia(weddingSet, "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500");
    }

    private Product createProduct(String name, String description, BigDecimal price,
                                String size, String slug, Subcategory subcategory) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setSize(size);
        product.setSlug(slug);
        product.setSubcategory(subcategory);
        return productRepository.save(product);
    }

    private void addColorVariants(Product product, String[] colors, String[] skus) {
        for (int i = 0; i < colors.length; i++) {
            ColorVariant variant = new ColorVariant();
            variant.setColorName(colors[i]);
            variant.setSku(skus[i]);
            variant.setPriceAdjustment(BigDecimal.ZERO);
            variant.setProduct(product);
            colorVariantRepository.save(variant);
        }
    }

    private void addMedia(Product product, String imageUrl) {
        // Add main product image
        Media mainImage = new Media();
        mainImage.setMediaType(Media.MediaType.IMAGE);
        mainImage.setUrl(imageUrl);
        mainImage.setAltText(product.getName() + " - Main Image");
        mainImage.setSortOrder(1);
        mainImage.setProduct(product);
        mediaRepository.save(mainImage);

        // Add additional angle images
        Media angleImage1 = new Media();
        angleImage1.setMediaType(Media.MediaType.IMAGE);
        angleImage1.setUrl(imageUrl + "&angle=side");
        angleImage1.setAltText(product.getName() + " - Side View");
        angleImage1.setSortOrder(2);
        angleImage1.setProduct(product);
        mediaRepository.save(angleImage1);

        Media angleImage2 = new Media();
        angleImage2.setMediaType(Media.MediaType.IMAGE);
        angleImage2.setUrl(imageUrl + "&angle=back");
        angleImage2.setAltText(product.getName() + " - Back View");
        angleImage2.setSortOrder(3);
        angleImage2.setProduct(product);
        mediaRepository.save(angleImage2);

        // Add video preview
        Media video = new Media();
        video.setMediaType(Media.MediaType.VIDEO);
        video.setUrl("https://www.youtube.com/embed/dQw4w9WgXcQ"); // Sample YouTube embed
        video.setAltText(product.getName() + " - Product Video");
        video.setSortOrder(4);
        video.setProduct(product);
        mediaRepository.save(video);
    }
}
