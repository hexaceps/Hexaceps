package com.example.hexaqna.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProductSiteLink is a Querydsl query type for ProductSiteLink
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProductSiteLink extends EntityPathBase<ProductSiteLink> {

    private static final long serialVersionUID = -1040988377L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QProductSiteLink productSiteLink = new QProductSiteLink("productSiteLink");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QProduct product;

    public final StringPath siteLink = createString("siteLink");

    public final NumberPath<Integer> siteOrd = createNumber("siteOrd", Integer.class);

    public final NumberPath<Integer> sitePrice = createNumber("sitePrice", Integer.class);

    public QProductSiteLink(String variable) {
        this(ProductSiteLink.class, forVariable(variable), INITS);
    }

    public QProductSiteLink(Path<? extends ProductSiteLink> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QProductSiteLink(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QProductSiteLink(PathMetadata metadata, PathInits inits) {
        this(ProductSiteLink.class, metadata, inits);
    }

    public QProductSiteLink(Class<? extends ProductSiteLink> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.product = inits.isInitialized("product") ? new QProduct(forProperty("product")) : null;
    }

}

