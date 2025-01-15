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

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QHexaMember member;

    public final QPayment payment;

    public final StringPath trackingId = createString("trackingId");

    public final ListPath<TrackingTrace, QTrackingTrace> trackingTraces = this.<TrackingTrace, QTrackingTrace>createList("trackingTraces", TrackingTrace.class, QTrackingTrace.class, PathInits.DIRECT2);

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
        this.member = inits.isInitialized("member") ? new QHexaMember(forProperty("member")) : null;
        this.payment = inits.isInitialized("payment") ? new QPayment(forProperty("payment"), inits.get("payment")) : null;
    }

}

