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

    public final ListPath<ProductImage, QProductImage> imageList = this.<ProductImage, QProductImage>createList("imageList", ProductImage.class, QProductImage.class, PathInits.DIRECT2);

    public final ListPath<ProductImageURL, QProductImageURL> imageURLList = this.<ProductImageURL, QProductImageURL>createList("imageURLList", ProductImageURL.class, QProductImageURL.class, PathInits.DIRECT2);

    public final NumberPath<Long> pno = createNumber("pno", Long.class);

    public final StringPath product_brand = createString("product_brand");

    public final DateTimePath<java.time.LocalDateTime> product_date = createDateTime("product_date", java.time.LocalDateTime.class);

    public final StringPath product_desc = createString("product_desc");

    public final ListPath<ProductOption, QProductOption> product_list = this.<ProductOption, QProductOption>createList("product_list", ProductOption.class, QProductOption.class, PathInits.DIRECT2);

    public final StringPath product_name = createString("product_name");

    public final BooleanPath product_stock = createBoolean("product_stock");

    public final ListPath<Qna, QQna> qnaList = this.<Qna, QQna>createList("qnaList", Qna.class, QQna.class, PathInits.DIRECT2);

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

