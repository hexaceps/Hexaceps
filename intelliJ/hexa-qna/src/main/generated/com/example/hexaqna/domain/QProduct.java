package com.example.hexaqna.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProduct is a Querydsl query type for Product
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProduct extends EntityPathBase<Product> {

    private static final long serialVersionUID = -198778586L;

    public static final QProduct product = new QProduct("product");

    public final StringPath category = createString("category");

    public final ListPath<ProductImage, QProductImage> imageList = this.<ProductImage, QProductImage>createList("imageList", ProductImage.class, QProductImage.class, PathInits.DIRECT2);

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final StringPath productBrand = createString("productBrand");

    public final StringPath productDescription = createString("productDescription");

    public final NumberPath<Long> productId = createNumber("productId", Long.class);

    public final StringPath productName = createString("productName");

    public final NumberPath<Integer> productSize = createNumber("productSize", Integer.class);

    public final NumberPath<Integer> productStock = createNumber("productStock", Integer.class);

    public final ListPath<Qna, QQna> qnaList = this.<Qna, QQna>createList("qnaList", Qna.class, QQna.class, PathInits.DIRECT2);

    public final DatePath<java.time.LocalDate> registeredAt = createDate("registeredAt", java.time.LocalDate.class);

    public final ListPath<ProductSiteLink, QProductSiteLink> siteList = this.<ProductSiteLink, QProductSiteLink>createList("siteList", ProductSiteLink.class, QProductSiteLink.class, PathInits.DIRECT2);

    public final DatePath<java.time.LocalDate> updatedAt = createDate("updatedAt", java.time.LocalDate.class);

    public QProduct(String variable) {
        super(Product.class, forVariable(variable));
    }

    public QProduct(Path<? extends Product> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProduct(PathMetadata metadata) {
        super(Product.class, metadata);
    }

}

