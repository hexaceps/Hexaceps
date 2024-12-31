package com.example.hexaqna.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QProductImageURL is a Querydsl query type for ProductImageURL
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QProductImageURL extends BeanPath<ProductImageURL> {

    private static final long serialVersionUID = 1719410010L;

    public static final QProductImageURL productImageURL = new QProductImageURL("productImageURL");

    public final StringPath imageURL = createString("imageURL");

    public final NumberPath<Integer> ord1 = createNumber("ord1", Integer.class);

    public QProductImageURL(String variable) {
        super(ProductImageURL.class, forVariable(variable));
    }

    public QProductImageURL(Path<? extends ProductImageURL> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProductImageURL(PathMetadata metadata) {
        super(ProductImageURL.class, metadata);
    }

}

