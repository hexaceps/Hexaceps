package com.example.hexaqna.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QProductOption is a Querydsl query type for ProductOption
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QProductOption extends BeanPath<ProductOption> {

    private static final long serialVersionUID = -2129239749L;

    public static final QProductOption productOption = new QProductOption("productOption");

    public final StringPath size = createString("size");

    public final NumberPath<Integer> size_price = createNumber("size_price", Integer.class);

    public final NumberPath<Integer> size_stock = createNumber("size_stock", Integer.class);

    public QProductOption(String variable) {
        super(ProductOption.class, forVariable(variable));
    }

    public QProductOption(Path<? extends ProductOption> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProductOption(PathMetadata metadata) {
        super(ProductOption.class, metadata);
    }

}

