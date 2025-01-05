package com.example.hexaqna.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPayment is a Querydsl query type for Payment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPayment extends EntityPathBase<Payment> {

    private static final long serialVersionUID = -675985859L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPayment payment = new QPayment("payment");

    public final StringPath address = createString("address");

    public final StringPath email = createString("email");

    public final QHexaMember member;

    public final StringPath name = createString("name");

    public final QOrder order;

    public final DateTimePath<java.time.LocalDateTime> paymentDate = createDateTime("paymentDate", java.time.LocalDateTime.class);

    public final NumberPath<Long> paymentId = createNumber("paymentId", Long.class);

    public final StringPath paymentNumber = createString("paymentNumber");

    public final StringPath paymentStatus = createString("paymentStatus");

    public final StringPath paymentType = createString("paymentType");

    public final StringPath paymentVender = createString("paymentVender");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final QProduct product;

    public final StringPath productBrand = createString("productBrand");

    public final StringPath productName = createString("productName");

    public final NumberPath<Integer> productPrice = createNumber("productPrice", Integer.class);

    public final NumberPath<Integer> productQuantity = createNumber("productQuantity", Integer.class);

    public final NumberPath<Integer> size = createNumber("size", Integer.class);

    public final NumberPath<Integer> totalPrice = createNumber("totalPrice", Integer.class);

    public QPayment(String variable) {
        this(Payment.class, forVariable(variable), INITS);
    }

    public QPayment(Path<? extends Payment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPayment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPayment(PathMetadata metadata, PathInits inits) {
        this(Payment.class, metadata, inits);
    }

    public QPayment(Class<? extends Payment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QHexaMember(forProperty("member")) : null;
        this.order = inits.isInitialized("order") ? new QOrder(forProperty("order"), inits.get("order")) : null;
        this.product = inits.isInitialized("product") ? new QProduct(forProperty("product")) : null;
    }

}

