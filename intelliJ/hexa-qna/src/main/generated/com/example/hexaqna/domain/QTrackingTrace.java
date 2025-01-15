package com.example.hexaqna.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTrackingTrace is a Querydsl query type for TrackingTrace
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTrackingTrace extends EntityPathBase<TrackingTrace> {

    private static final long serialVersionUID = -1326101563L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTrackingTrace trackingTrace = new QTrackingTrace("trackingTrace");

    public final StringPath company = createString("company");

    public final StringPath location = createString("location");

    public final StringPath status = createString("status");

    public final StringPath step = createString("step");

    public final NumberPath<Long> traceId = createNumber("traceId", Long.class);

    public final QTracking tracking;

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public QTrackingTrace(String variable) {
        this(TrackingTrace.class, forVariable(variable), INITS);
    }

    public QTrackingTrace(Path<? extends TrackingTrace> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTrackingTrace(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTrackingTrace(PathMetadata metadata, PathInits inits) {
        this(TrackingTrace.class, metadata, inits);
    }

    public QTrackingTrace(Class<? extends TrackingTrace> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.tracking = inits.isInitialized("tracking") ? new QTracking(forProperty("tracking"), inits.get("tracking")) : null;
    }

}

