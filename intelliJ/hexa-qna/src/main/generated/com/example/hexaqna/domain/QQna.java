package com.example.hexaqna.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QQna is a Querydsl query type for Qna
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QQna extends EntityPathBase<Qna> {

    private static final long serialVersionUID = 1354988955L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QQna qna = new QQna("qna");

    public final StringPath content = createString("content");

    public final QHexaMember member_id;

    public final StringPath password = createString("password");

    public final QProduct product_id;

    public final DateTimePath<java.time.LocalDateTime> qna_Date = createDateTime("qna_Date", java.time.LocalDateTime.class);

    public final NumberPath<Long> qno = createNumber("qno", Long.class);

    public final StringPath reply = createString("reply");

    public final NumberPath<Integer> reply_at = createNumber("reply_at", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> reply_Date = createDateTime("reply_Date", java.time.LocalDateTime.class);

    public final StringPath reply_id = createString("reply_id");

    public final NumberPath<Integer> secret = createNumber("secret", Integer.class);

    public final StringPath subject = createString("subject");

    public QQna(String variable) {
        this(Qna.class, forVariable(variable), INITS);
    }

    public QQna(Path<? extends Qna> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QQna(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QQna(PathMetadata metadata, PathInits inits) {
        this(Qna.class, metadata, inits);
    }

    public QQna(Class<? extends Qna> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member_id = inits.isInitialized("member_id") ? new QHexaMember(forProperty("member_id")) : null;
        this.product_id = inits.isInitialized("product_id") ? new QProduct(forProperty("product_id")) : null;
    }

}

