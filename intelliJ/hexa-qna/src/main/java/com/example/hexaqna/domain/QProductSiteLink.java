package com.example.hexaqna.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QProductSiteLink is a Querydsl query type for ProductSiteLink
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QProductSiteLink extends BeanPath<ProductSiteLink> {

    private static final long serialVersionUID = -1040988377L;

    public static final QProductSiteLink productSiteLink = new QProductSiteLink("productSiteLink");

    public final StringPath siteLink = createString("siteLink");

    public final NumberPath<Integer> siteOrd = createNumber("siteOrd", Integer.class);

    public QProductSiteLink(String variable) {
        super(ProductSiteLink.class, forVariable(variable));
    }

    public QProductSiteLink(Path<? extends ProductSiteLink> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProductSiteLink(PathMetadata metadata) {
        super(ProductSiteLink.class, metadata);
    }

}

