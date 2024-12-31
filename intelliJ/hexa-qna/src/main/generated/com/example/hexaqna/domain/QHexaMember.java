package com.example.hexaqna.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QHexaMember is a Querydsl query type for HexaMember
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QHexaMember extends EntityPathBase<HexaMember> {

    private static final long serialVersionUID = -759292087L;

    public static final QHexaMember hexaMember = new QHexaMember("hexaMember");

    public final StringPath activate_yn = createString("activate_yn");

    public final StringPath address = createString("address");

    public final DateTimePath<java.time.LocalDateTime> create_Date = createDateTime("create_Date", java.time.LocalDateTime.class);

    public final StringPath email = createString("email");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<MemberRole, EnumPath<MemberRole>> memberRoleList = this.<MemberRole, EnumPath<MemberRole>>createList("memberRoleList", MemberRole.class, EnumPath.class, PathInits.DIRECT2);

    public final StringPath name = createString("name");

    public final NumberPath<Integer> newsletter = createNumber("newsletter", Integer.class);

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final ListPath<Qna, QQna> qnaList = this.<Qna, QQna>createList("qnaList", Qna.class, QQna.class, PathInits.DIRECT2);

    public final StringPath rank = createString("rank");

    public final NumberPath<Integer> social_yn = createNumber("social_yn", Integer.class);

    public QHexaMember(String variable) {
        super(HexaMember.class, forVariable(variable));
    }

    public QHexaMember(Path<? extends HexaMember> path) {
        super(path.getType(), path.getMetadata());
    }

    public QHexaMember(PathMetadata metadata) {
        super(HexaMember.class, metadata);
    }

}

