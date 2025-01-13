package com.example.hexaqna.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTracking is a Querydsl query type for Tracking
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTracking extends EntityPathBase<Tracking> {

    private static final long serialVersionUID = 407081312L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTracking tracking = new QTracking("tracking");

    public final StringPath company = createString("company");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath location = createString("location");

    public final QPayment payment;

    public final StringPath status = createString("status");

    public final StringPath step = createString("step");

    public final StringPath trackingId = createString("trackingId");

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public QTracking(String variable) {
        this(Tracking.class, forVariable(variable), INITS);
    }

    public QTracking(Path<? extends Tracking> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTracking(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTracking(PathMetadata metadata, PathInits inits) {
        this(Tracking.class, metadata, inits);
    }

    public QTracking(Class<? extends Tracking> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.payment = inits.isInitialized("payment") ? new QPayment(forProperty("payment"), inits.get("payment")) : null;
    }

}

