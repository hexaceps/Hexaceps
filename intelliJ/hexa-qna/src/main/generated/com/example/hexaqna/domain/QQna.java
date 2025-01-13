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

    public final QHexaMember memberId;

    public final StringPath password = createString("password");

    public final QProduct productId;

    public final DateTimePath<java.time.LocalDateTime> qnaDate = createDateTime("qnaDate", java.time.LocalDateTime.class);

    public final NumberPath<Long> qno = createNumber("qno", Long.class);

    public final StringPath reply = createString("reply");

    public final NumberPath<Integer> replyAt = createNumber("replyAt", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> replyDate = createDateTime("replyDate", java.time.LocalDateTime.class);

    public final StringPath replyId = createString("replyId");

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
        this.memberId = inits.isInitialized("memberId") ? new QHexaMember(forProperty("memberId")) : null;
        this.productId = inits.isInitialized("productId") ? new QProduct(forProperty("productId")) : null;
    }

}

